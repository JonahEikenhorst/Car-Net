/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { GarageService } from "./garage.service";
import { Garage } from "./garage.schema";
import { RelationGarageInterface } from "@car-net/interfaces";

@Controller("garages")
export class GarageController {

    constructor(private readonly garageService: GarageService) {
    }

    @Post()
    async createGarage(@Body() RelationGarage: Partial<RelationGarageInterface>): Promise<Garage> {

        const newGarage = await this.garageService.addGarage(RelationGarage.garageName);
        await this.garageService.assignGarageToUser(RelationGarage.userid, newGarage['_id']);
        return newGarage;
    }

    @Get()
    async findAllGarages(): Promise<Garage[]> {
        const garages = await this.garageService.findAll();
        if (garages.length === 0) {
            throw new HttpException('No garages found', 404);
          }
        return garages;
    }

    @Get(":id")
    async findGarageById(@Param("id") id: string): Promise<Garage> {
        return this.garageService.findOne(id);
    }

    @Put(':id')
    async updateGarage(
    @Param("id") id: string, 
    @Body() changes: Partial<Garage>): Promise<Garage> {
        if (!id) {
            throw new HttpException('No garage id provided', HttpStatus.BAD_REQUEST);
            }
        else if (!changes) {
            throw new HttpException('No changes provided', HttpStatus.BAD_REQUEST);
            } 
        const updatedGarage = await this.garageService.updateGarage(id, changes);
        return updatedGarage
    }

    @Delete(':id')
    async deleteGarage(@Param("id") id: string) {
        if (!id) {
            throw new HttpException('No garage id provided', HttpStatus.BAD_REQUEST);
          }
        return this.garageService.deleteGarage(id);
    }

}


