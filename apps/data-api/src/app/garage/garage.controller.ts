/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, MethodNotAllowedException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { GarageService } from "./garage.service";
import { Garage } from "./garage.schema";
import { RelationGarageInterface } from "@car-net/interfaces";
import { Car } from "../car/car.schema";
import { User } from "../user/user.schema";

@Controller("garages")
export class GarageController {

    constructor(private readonly garageService: GarageService) {
    }


    @Get('/like/:garageName/:email')
    async likeGarage(@Param("garageName") garageName: string, @Param("email") email: string): Promise<Garage> {
        const garage1 = await this.garageService.findGarageByName(garageName);
        const emailtofind = garage1.owner.email; 
        const liked: User[] = garage1.likes;

        for (let i = 0; i < liked.length; i++) {
            if (liked[i].email === email) {
                throw new MethodNotAllowedException('You already liked this garage!');
            }
        }
        if(email === emailtofind) {
            throw new MethodNotAllowedException('You cannot like your own garage!');
        }
        if (!garageName) {
            throw new NotFoundException('No garage name provided');
          }
        else if (!email) {
            throw new NotFoundException('No user email provided');
          }
        const garage = await this.garageService.likeGarage(garageName, email);
        return garage;
    }


    @Post()
    async createGarage(@Body() RelationGarage: Partial<RelationGarageInterface>): Promise<Garage> {

        const newGarage = await this.garageService.addGarage(RelationGarage.garageName);
        await this.garageService.assignGarageToUser(RelationGarage.userid, newGarage['_id']);
        return newGarage;
    }

    @Get("/name/:garageName")
    async findGarageByName(@Param("garageName") garageName: string): Promise<Garage> {
        if (!garageName) {
            throw new HttpException('No garage name provided', HttpStatus.BAD_REQUEST);
          }
        const garage = await this.garageService.findGarageByName(garageName);
        console.log(garageName);
        return garage;
    }

    @Get("/garageId/:garageName")
    async findGarageIdByName(@Param("garageName") garageName: string): Promise<string> {
        return (await this.garageService.findGarageIdByName(garageName));
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

    @Get("/cars/:email")
    async findMyCars(@Param("email") email: string): Promise<Car[]> {
        return this.garageService.findMyCars(email);
    }

    @Put("cars/add/:numberPlate/:garageId")
    async addCarToGarage(@Param("numberPlate") numberPlate: string, @Param("garageId") garageId: string ): Promise<Car> {
        return this.garageService.addCarToGarage(garageId, numberPlate);
    }

    @Put(":userId/:garageId")
    async assignGarageToUser(@Param("userId") userId: string, @Param("garageId") garageId: string ) {
        await this.garageService.assignGarageToUser(userId, garageId);
    }

    @Get("/recommendedGarages/:email")
    async findRecommendedGarages(@Param("email") email: string): Promise<Garage[]> {
        return this.garageService.findRecommendedGarages(email);
    }
}