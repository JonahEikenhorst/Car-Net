/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CarType } from "../carModel/carModel.schema";
import { CarModelService } from "../carModel/carModel.service";
import { Brand } from "./brand.schema";

@Injectable() 
export class BrandService {

    constructor(@InjectModel('Brand') private brandModel: Model<Brand>, private carModelService: CarModelService) {
        
    }

    async getBrandByName(brand: string): Promise<Brand> {
        return this.brandModel.findOne({name: brand});
    }

    async removeBrandByName(brandName: string) {
        return this.brandModel.deleteOne({name: brandName});
    }

    async findAll(): Promise<Brand[]> {
        return this.brandModel.find();
    }

    async updateBrand(id: string, changes: Partial<Brand>): Promise<Brand> {
        console.log("Updating brand with id: " + id);
        return this.brandModel.findOneAndUpdate({_id: id}, changes,{new:true});
    }

    async updateBrandByName(brand: string, changes: Partial<Brand>): Promise<Brand> {
        return this.brandModel.findOneAndUpdate({name: brand}, changes,{new:true});
    }

    async deleteBrand(id: string) {
        return this.brandModel.deleteOne({_id: id});
    }

    async addBrand(brand: Partial<Brand>): Promise<Brand> {
        const newBrand = new this.brandModel(brand);
        await newBrand.save();
        return newBrand.toObject({versionKey: false});
    }
    
    async addExistingCarModelToBrand(brand: string, carModel: string) {
        const brandToUpdate = await this.getBrandByName(brand);
        const carModelToAdd = await this.carModelService.getCarModelByName(carModel);
        await this.updateBrand(brandToUpdate["_id"], brandToUpdate);
    }

    async addNewCarModelToBrand(brand: string, name: string, type: CarType, image: string) {
        const brandToUpdate = await this.getBrandByName(brand);
        const carModelToAdd = await this.carModelService.addCarModel({name: name, carType: type, imageUrl: image, brand: brand});
        await this.updateBrand(brandToUpdate["_id"], brandToUpdate);
    }
}
