/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { Brand } from "./brand.schema";
import { CarModel } from "../carModel/carModel.schema";

@Controller("brands")
export class BrandController {

    constructor(private brandService: BrandService) {
    }

    @Post()
    async createBrand(@Body() brand: Partial<Brand>): Promise<Brand> {
        console.log("Creating Brand: " + brand);

        return this.brandService.addBrand(brand);

    }

    @Get(":brand")
    async findBrandByName(@Param("brand") brand: string): Promise<Brand> {
        return this.brandService.getBrandByName(brand);
    }

    @Get()
    async findAllBrands(): Promise<Brand[]> {
        return this.brandService.findAll();
    }

    @Put(':id')
    async updateBrand(
    @Param("id") id: string, 
    @Body() changes: Partial<Brand>): Promise<Brand> {

        console.log("Updating brand with id: " + id);

        return this.brandService.updateBrand(id, changes);
    }

    @Delete(':id')
    async deleteBrand(@Param("id") id: string) {
        console.log("Deleting brand with id: " + id);

        return this.brandService.deleteBrand(id);
    }

    @Put(':brand/:carModel')
    async addExistingCarModelToBrand(@Param("brand") brand: string, @Param("carModel") carModel: string) {
        return this.brandService.addExistingCarModelToBrand(brand, carModel);
    }

    @Post(':brand/:carModel/new')
    async addNewCarModelToBrand(@Param("brand") brand: string, @Param("carModel") carModel: Partial<CarModel>) {
        return this.brandService.addNewCarModelToBrand(brand, carModel.name, carModel.carType, carModel.imageUrl, );
    }
}