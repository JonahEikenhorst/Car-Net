import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CarService } from "../car/car.service";
import { Garage } from "./garage.schema";
import { Neo4jService } from "nest-neo4j/dist";
import { UserService } from "../user/user.service";

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

    async updateGarage(id: string, changes: Partial<Garage>): Promise<Garage> {

        return this.garageModel.findOneAndUpdate({_id: id}, changes,{new:true});
    }

    async deleteGarage(id: string) {
        await this.neo4jService.write(`MATCH (p:Garage {id: "${id}"}) DETACH DELETE (p)`);
        return this.garageModel.deleteOne({_id: id});
    }

    async addGarage(garageName: string): Promise<Garage> {
        const newGarage = new this.garageModel({garageName: garageName});
        await newGarage.save();
        await this.neo4jService.write(`CREATE (g:Garage {id: "${newGarage['_id']}", name: "${newGarage.garageName}"})`);
        return newGarage.toObject({versionKey: false});
    }

    async addCarToGarage(garageId: string, numberPlate: string) {
        const garageToUpdate = await this.findOne(garageId);
        const carToAdd = await this.carService.getCarByNumberPlate(numberPlate);
        garageToUpdate.cars.push(carToAdd);
        await this.updateGarage(garageToUpdate["_id"], garageToUpdate);

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
        await this.neo4jService.write(`MATCH (g:Garage {id: "${garage['_id']}"}) MATCH (u:User {id: "${userId}"}) CREATE (u)-[:OWNS]->(g)`);
        await this.updateGarage(garage["_id"], garage);
    }
}