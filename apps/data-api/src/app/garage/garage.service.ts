import { Injectable, MethodNotAllowedException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CarService } from "../car/car.service";
import { Garage } from "./garage.schema";
import { Neo4jService } from "nest-neo4j/dist";
import { UserService } from "../user/user.service";
import { Car } from "../car/car.schema";

@Injectable() 
export class GarageService {


    constructor(@InjectModel('Garage') private garageModel: Model<Garage>, private carService: CarService, private userService: UserService, private readonly neo4jService: Neo4jService) {
        
    }

    async findAll(): Promise<Garage[]> {
        const garages = await this.garageModel.find();
        return garages;
    }

    async findOne(id: string): Promise<Garage> {
        return this.garageModel.findOne({_id: id});
    }

    async findGarageByName(garageName: string): Promise<Garage> {
        if(!garageName) {
            throw new NotFoundException('No garage name provided');
        }
        const garage = await this.garageModel.findOne({garageName: garageName});
        if(!garage) {
            throw new NotFoundException('Garage not found');
        }
        return garage;
    }

    async findGarageIdByName(garageName: string): Promise<string> {
        const garage = await this.garageModel.findOne({garageName: garageName});
        return garage["_id"].toString();
    }

    async updateGarage(id: string, changes: Partial<Garage>): Promise<Garage> {
        return this.garageModel.findOneAndUpdate({_id: id}, changes,{new:true});
    }

    async deleteGarage(id: string) {
        await this.neo4jService.write(`MATCH (p:Garage {garageId: "${id}"}) DETACH DELETE (p)`);
        return this.garageModel.deleteOne({_id: id});
    }

    async addGarage(garageName: string): Promise<Garage> {
        const newGarage = new this.garageModel({garageName: garageName});
        await newGarage.save();
        await this.neo4jService.write(`CREATE (g:Garage {garageId: "${newGarage['_id']}", name: "${newGarage.garageName}"})`);
        return newGarage.toObject({versionKey: false});
    }

    async addCarToGarage(email: string, numberPlate: string): Promise<Car> {
        const user = await this.userService.findOneByEmail(email);
        const garageToUpdate = await this.findGarageByName(user.garageName);
        if(garageToUpdate.owner.email !== email) {
            throw new MethodNotAllowedException("You are not the owner of this garage");
        } 
        if (!garageToUpdate) {
            throw new NotFoundException("Garage not found " + user.garageName);
        }
        const carToAdd = await this.carService.getCarByNumberPlate(numberPlate);
        garageToUpdate.cars.push(carToAdd);
        await this.updateGarage(garageToUpdate["_id"], garageToUpdate);
        return carToAdd;

    }

    async removeCarFromGarage(email: string, numberPlate: string): Promise<Car> {
        const user = await this.userService.findOneByEmail(email);
        const garageToUpdate = await this.findGarageByName(user.garageName);
        if(garageToUpdate.owner.email !== email) {
            throw new MethodNotAllowedException("You are not the owner of this garage");
        } 
        const carToRemove = await this.carService.getCarByNumberPlate(numberPlate);
        garageToUpdate.cars = garageToUpdate.cars.filter(car => car.numberPlate !== numberPlate);
        await this.updateGarage(garageToUpdate["_id"], garageToUpdate);
        return carToRemove;
    }

    async assignGarageToUser(email: string, garageId: string) {
        const garage = await this.findOne(garageId);
        garage.owner = await this.userService.findOneByEmail(email);
        const user = await this.userService.findOneByEmail(email);
        user.garageName = garage.garageName;
        await this.userService.updateUser(user["_id"], user);

        await this.neo4jService.write(`MATCH (g:Garage {garageId: "${garage['_id'].toString()}"}), (u:User {userId: "${user["_id"]}"}) CREATE (u)-[:OWNS]->(g)`);
        await this.updateGarage(garage["_id"], garage);
    }

    async likeGarage(garageName: string, email: string): Promise<Garage> {
        const garageToLike = await this.findGarageByName(garageName);
        if (!garageToLike) {
            throw new NotFoundException("Garage not found " + garageName);
        }
        const userThatLikes = await this.userService.findOneByEmail(email);
        if (!userThatLikes) {
            throw new NotFoundException("User not found " + email);
        }
        await this.neo4jService.write(`MATCH (u:User {userId: "${userThatLikes["_id"].toString()}"}), (g:Garage {name: "${garageName}"}) CREATE (u)-[r:LIKES]->(g)`);
        userThatLikes.likedGarages.push(garageToLike.garageName);
        garageToLike.likes.push(userThatLikes);

        const garage = await this.updateGarage(garageToLike["_id"].toString(), garageToLike);
        await this.userService.updateUser(userThatLikes["_id"].toString(), userThatLikes);
        return garage;
      }

      async unlikeGarage(garageName: string, email: string): Promise<Garage> {
        const garage1 = await this.findGarageByName(garageName);
        const user1 = await this.userService.findOneByEmail(email);

        if(!garage1) {
            throw new NotFoundException("Garage not found " + garageName);
        }
        if(!user1) {
            throw new NotFoundException("User not found " + email);
        }
        garage1.likes = garage1.likes.filter((user) => user.email !== email);
        await this.updateGarage(garage1['_id'], garage1);
        user1.likedGarages = user1.likedGarages.filter((garage) => garage !== garageName);
        await this.userService.updateUser(user1['_id'], user1);
        await this.neo4jService.write(`MATCH (u:User {userId: "${user1["_id"].toString()}"})-[:LIKES]->(g:Garage {name: "${garageName}"})
        WITH u, g
        LIMIT 1
        MATCH (u)-[r:LIKES]->(g)
        DELETE r
        `);
        return garage1;
      }

    async findRecommendedGarages(email: string): Promise<Garage[]> {
        const user = await this.userService.findOneByEmail(email);
        const recommendedGarages = await this.neo4jService.read(`MATCH (u:User {userId: "${user["_id"].toString()}"})-[:LIKES]->(g:Garage)<-[:LIKES]-(u2:User)-[:OWNS]->(g2:Garage) WHERE NOT (u)-[:OWNS]->(g2) RETURN g2 LIMIT 5`);
        
        const listRecommendedGarages: Garage[] = [];
        for (const garage of recommendedGarages.records.map(record => record.get(0).properties)) {
            await this.findOne(garage.garageId).then(garage => { if(!user.likedGarages.includes(garage.garageName)) {listRecommendedGarages.push(garage);}} 
        ).then(() => {
                return listRecommendedGarages;
            }); 
        }
            return listRecommendedGarages;
        }

    async findMyCars(email: string): Promise<Car[]> {
        const user = await this.userService.findOneByEmail(email);
        const garage = await this.findGarageByName(user.garageName);
        if (!garage) {
            throw new NotFoundException("Garage not found " + user.garageName);
        }
        
        return garage.cars;
    }




        
}