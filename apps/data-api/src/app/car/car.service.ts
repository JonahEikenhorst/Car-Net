import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car } from "./car.schema";

@Injectable() 
export class CarService {


    constructor(@InjectModel('Car') private carModel: Model<Car>) {
        
    }

    async findAll(): Promise<Car[]> {
        return this.carModel.find();
    }

    async updateCar(id: string, changes: Partial<Car>): Promise<Car> {

        return this.carModel.findOneAndUpdate({_id: id}, changes,{new:true});
    }

    async deleteCar(id: string) {
        return this.carModel.deleteOne({_id: id});
    }

    async addCar(car: Partial<Car>): Promise<Car> {
        const newCar = new this.carModel(car);
        await newCar.save();
        return newCar.toObject({versionKey: false});
    }
}