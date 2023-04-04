import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car } from "./car.schema";
import { CarModelService } from "../carModel/carModel.service";

@Injectable() 
export class CarService {


    constructor(@InjectModel('Car') private carModel: Model<Car>, private carModelService: CarModelService) {
        
    }

    async findAll(): Promise<Car[]> {
        return this.carModel.find();
    }

    async getCarByNumberPlate(numberPlate: string): Promise<Car> {
        return this.carModel.findOne({numberPlate: numberPlate});
    }

    async updateCar(id: string, changes: Partial<Car>): Promise<Car> {

        return this.carModel.findOneAndUpdate({_id: id}, changes,{new:true});
    }

    async deleteCar(id: string) {
        return this.carModel.deleteOne({_id: id});
    }

    async addCar(car: {numberPlate: string, country: string, brand: string, carModel: string }): Promise<Car> {
        const newCar = new this.carModel(car);
        newCar.carModel = await this.carModelService.getCarModelByName(car.carModel);
        await newCar.save();
        return newCar.toObject({versionKey: false});
    }
}