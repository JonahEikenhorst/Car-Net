/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CarModelService } from "./carModel.service";
import { CarModel } from "./carModel.schema";

@Controller("carModels")
export class CarModelController {

    constructor(private carModelService: CarModelService) {
    }

    @Post()
    async createCarModel(@Body() carModel: Partial<CarModel>): Promise<CarModel> {
        console.log("Creating CarModel: " + carModel);

        return this.carModelService.addCarModel(carModel);

    }

    @Get()
    async findAllCarModels(): Promise<CarModel[]> {
        return this.carModelService.findAll();
    }

    @Put(':id')
    async updateCarModel(
    @Param("id") id: string, 
    @Body() changes: Partial<CarModel>): Promise<CarModel> {

        console.log("Updating carModel with id: " + id);

        return this.carModelService.updateCarModel(id, changes);
    }

    @Delete(':id')
    async deleteCarModel(@Param("id") id: string) {
        console.log("Deleting carModel with id: " + id);

        return this.carModelService.deleteCarModel(id);
    }

}