import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Garage } from "./garage.schema";

@Injectable() 
export class GarageService {


    constructor(@InjectModel('Garage') private garageModel: Model<Garage>) {
        
    }

    async findAll(): Promise<Garage[]> {
        return this.garageModel.find();
    }

    async findOne(id: string): Promise<Garage> {
        return this.garageModel.findOne({_id: id});
    }

    async updateGarage(id: string, changes: Partial<Garage>): Promise<Garage> {

        return this.garageModel.findOneAndUpdate({_id: id}, changes,{new:true});
    }

    async deleteGarage(id: string) {
        return this.garageModel.deleteOne({_id: id});
    }

    async addGarage(garage: Partial<Garage>): Promise<Garage> {
        const newGarage = new this.garageModel(garage);
        await newGarage.save();
        return newGarage.toObject({versionKey: false});
    }
}