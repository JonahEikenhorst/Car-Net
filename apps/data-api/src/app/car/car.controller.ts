/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CarService } from "./car.service";
import { Car } from "./car.schema";

@Controller("cars")
export class CarController {

    constructor(private carService: CarService) {
    }

    @Post()
    async createCar(@Body() car: {numberPlate: string, country: string, brand: string, carModel: string }): Promise<Car> {
        return this.carService.addCar(car);

    }

    @Get()
    async findAllCars(): Promise<Car[]> {
        return this.carService.findAll();
    }

    @Put(':id')
    async updateCar(
    @Param("id") id: string, 
    @Body() changes: Partial<Car>): Promise<Car> {

        console.log("Updating car with id: " + id);

        return this.carService.updateCar(id, changes);
    }

    @Delete(':id')
    async deleteCar(@Param("id") id: string) {
        console.log("Deleting car with id: " + id);

        return this.carService.deleteCar(id);
    }

    @Get('numberPlate/:numberPlate')
    async findCarByNumberPlate(@Param("numberPlate") numberPlate: string): Promise<Car> {
        return this.carService.getCarByNumberPlate(numberPlate);
    }
}


