/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GarageService } from "./garage.service";
import { Garage } from "./garage.schema";

@Controller("garages")
export class GarageController {

    constructor(private garageService: GarageService) {
    }

    @Post()
    async createGarage(@Body() garage: Partial<Garage>): Promise<Garage> {
        // console.log("Creating garage: " + garage);

        return this.garageService.addGarage(garage);

    }

    @Get()
    async findAllGarages(): Promise<Garage[]> {
        return this.garageService.findAll();
    }

    @Get(":id")
    async findGarageById(@Param("id") id: string): Promise<Garage> {
        return this.garageService.findOne(id);
    }

    @Put(':id')
    async updateGarage(
    @Param("id") id: string, 
    @Body() changes: Partial<Garage>): Promise<Garage> {

        console.log("Updating garage with id: " + id);

        return this.garageService.updateGarage(id, changes);
    }

    @Delete(':id')
    async deleteGarage(@Param("id") id: string) {
        console.log("Deleting garage with id: " + id);

        return this.garageService.deleteGarage(id);
    }

}


