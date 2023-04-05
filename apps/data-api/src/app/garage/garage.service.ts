import { Injectable, NotFoundException } from "@nestjs/common";
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

    async addCarToGarage(garageId: string, numberPlate: string): Promise<Car> {
        const garageToUpdate = await this.findOne(garageId);
        if (!garageToUpdate) {
            throw new Error("Garage not found " + garageId);
        }
        const carToAdd = await this.carService.getCarByNumberPlate(numberPlate);
        garageToUpdate.cars.push(carToAdd);
        await this.updateGarage(garageToUpdate["_id"], garageToUpdate);
        return carToAdd;

    }

    async removeCarFromGarage(garageId: string, numberPlate: string) {
        const garageToUpdate = await this.findOne(garageId);
        const carToRemove = await this.carService.getCarByNumberPlate(numberPlate);
        garageToUpdate.cars = garageToUpdate.cars.filter(car => car["_id"] !== carToRemove["_id"]);
        await this.updateGarage(garageToUpdate["_id"], garageToUpdate);
    }

    async assignGarageToUser(userId: string, garageId: string) {
        const garage = await this.findOne(garageId);
        garage.owner = await this.userService.findOne(userId);
        const user = await this.userService.findOne(userId);
        user.garageName = garage.garageName;
        await this.userService.updateUser(userId, user);

        await this.neo4jService.write(`MATCH (g:Garage {garageId: "${garage['_id'].toString()}"}), (u:User {userId: "${userId}"}) CREATE (u)-[:OWNS]->(g)`);
        await this.updateGarage(garage["_id"], garage);
    }

    async likeGarage(garageName: string, email: string): Promise<Garage> {
        const garageToLike = await this.findGarageByName(garageName);
        if (!garageToLike) {
            throw new Error("Garage not found " + garageName);
        }
        const userThatLikes = await this.userService.findOneByEmail(email);
        if (!userThatLikes) {
            throw new Error("User not found " + email);
        }
        await this.neo4jService.write(`MATCH (u:User {userId: "${userThatLikes["_id"].toString()}"}), (g:Garage {garageName: "${garageName}"}) CREATE (u)-[r:LIKES]->(g)`);
        userThatLikes.likedGarages.push(garageToLike.garageName);
        garageToLike.likes.push(userThatLikes);

        const garage = await this.updateGarage(garageToLike["_id"].toString(), garageToLike);
        await this.userService.updateUser(userThatLikes["_id"].toString(), userThatLikes);
        return garage;
      }

    async findRecommendedGarages(userId: string): Promise<Garage[]> {
        const recommendedGarages = await this.neo4jService.read(`MATCH (u:User {userId: "${userId}"})-[:LIKES]->(g:Garage)<-[:LIKES]-(u2:User)-[:OWNS]->(g2:Garage) WHERE NOT (u)-[:OWNS]->(g2) RETURN g2 LIMIT 5`);
        
        const listRecommendedGarages: Garage[] = [];
        for (const garage of recommendedGarages.records.map(record => record.get(0).properties)) {
            await this.findOne(garage.garageId).then(garage => { listRecommendedGarages.push(garage);
        }).then(() => {
                return listRecommendedGarages;
            }); 
        }
            return listRecommendedGarages;
        }

    async findMyCars(email: string): Promise<Car[]> {
        const user = await this.userService.findOneByEmail(email);
        const garage = await this.findGarageByName(user.garageName);
        if (!garage) {
            throw new Error("Garage not found " + user.garageName);
        }
        
        return garage.cars;
    }




        
}