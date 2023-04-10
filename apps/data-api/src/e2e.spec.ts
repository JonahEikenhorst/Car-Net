import request = require('supertest');

import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from "@nestjs/config";

import { MongoClient } from 'mongodb';
import { MongoMemoryReplSet, MongoMemoryServer } from "mongodb-memory-server";
import { disconnect } from "mongoose";
import { Neo4jModule } from "nest-neo4j/dist";

import { TokenMiddleware } from './app/auth/token.middleware';

import { RelationGarageInterface, UserInterface } from '@car-net/interfaces';

import { AuthModule } from './app/auth/auth.module';
import { CarModule } from './app/car/car.module';
import { GarageModule } from './app/garage/garage.module';
import { UserModule } from './app/user/user.module';
import { BrandModule } from './app/brand/brand.module';


let mongod: MongoMemoryReplSet;
let uri: string;

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: ".env"
      }),
      Neo4jModule.forRoot({
        scheme: "neo4j",
        host: "localhost",
        port: 7687,
        username: "neo4j",
        password: "neo4jsecret"
      }),
      MongooseModule.forRootAsync({
        useFactory: async () => {
          mongod = await MongoMemoryReplSet.create({replSet: {count: 2}})
          uri = mongod.getUri();
          return {uri};
        }
      }),
      AuthModule, GarageModule, CarModule, UserModule, BrandModule
    ],
    controllers: [],
    providers: [],
  })
  export class TestAppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
      consumer
        .apply(TokenMiddleware)
        .forRoutes(

        )
    }
  }
  
  
  describe("e2e tests of back-end", () => {
    let app: INestApplication;
    let server;
    let module: TestingModule;
    let mongoc: MongoClient;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [TestAppModule]
      })
        .compile();
  
      app = module.createNestApplication();
      app.setGlobalPrefix("api");
      await app.init();
  
      mongoc = new MongoClient(uri);
      await mongoc.connect();
  
      server = app.getHttpServer();
    });
  
    beforeEach(async () => {
      await mongoc.db("test").collection("identities").deleteMany({});
      await mongoc.db("test").collection("users").deleteMany({});
      await mongoc.db("test").collection("garages").deleteMany({});
        await mongoc.db("test").collection("cars").deleteMany({});
        await mongoc.db("test").collection("brands").deleteMany({});
        await mongoc.db("test").collection("carmodels").deleteMany({});
    });
  
    afterAll(async () => {
      await mongoc.close();
      await disconnect();
      await mongod.stop();
    });

    describe("Authentication", () => {
        let credentials;
        let logincredentials;
    
        beforeEach(() => {
    
          credentials = {
            username: 'e2eUser',
            email: 'e2e@user.nl',
            hash: 'testtest',
            repeatPassword: 'testtest'

          };
    
          logincredentials = {
            email: credentials.email,
            hash: credentials.hash

          };
        });
    
        it("User Registration and Log in", async () => {
          const register = await request(server)
            .post("/api/register")
            .send(credentials)
          expect(register.status).toBe(201);
          expect(register.body).toHaveProperty("email");
          expect(register.body).toHaveProperty("username");
          expect(register.body).toHaveProperty("_id");
          expect(register.body).toHaveProperty("roles");
          expect(register.body).toHaveProperty("likedGarages");

    
          const login = await request(server)
            .post("/api/login")
            .send(logincredentials)
          expect(login.status).toBe(201);
          expect(login.body).toHaveProperty("token");
        });
        });


    describe("Garage", () => {
        let garage: Partial<RelationGarageInterface>;
        let user1: UserInterface;
        let user2: UserInterface;
        let garageName: string;
        let email: string;
        let credentials;
        let logincredentials;
        let credentials2;

        beforeEach(() => {

            user1 = {
                username: 'e2eUser',
                email: 'e2e@gmail.com',
                roles: ['user'],
                garageName: 'e2eGarage',
                likedGarages: [],
            }

            user2 = {
                username: 'e2eUser2',
                email: 'e2e2@gmail.com',
                roles: ['user'],
                garageName: 'e2e2Garage',
                likedGarages: [],
            }

           garageName = "e2eGarage";
           email = "e2e@user.nl";

           credentials = {
            username: 'e2eUser',
            email: 'e2e@user.nl',
            hash: 'testtest',
            repeatPassword: 'testtest'
          };

          credentials2 = {
            username: 'e2e2User',
            email: 'e2e2@user.nl',
            hash: 'testtest',
            repeatPassword: 'testtest'
          };
    
          logincredentials = {
            email: credentials.email,
            hash: credentials.hash

          };
          
    
        });

        it("Garage Creation", async () => {
            const register = await request(server)
            .post("/api/register")
            .send(credentials)
            expect(register.status).toBe(201);

            const garageCreation = await request(server)
                .post("/api/garages")
                .send({garageName, email});
            expect(garageCreation.status).toBe(201);
            expect(garageCreation.body).toHaveProperty("garageName");
            expect(garageCreation.body).toHaveProperty("_id");
            expect(garageCreation.body).toHaveProperty("cars");
            expect(garageCreation.body).toHaveProperty("likes");
        });

        it("Garage Update", async () => {
            const register = await request(server)
            .post("/api/register")
            .send(credentials)
            expect(register.status).toBe(201);

            const garageCreation = await request(server)
                .post("/api/garages")
                .send({garageName, email})
            expect(garageCreation.status).toBe(201);
            expect(garageCreation.body).toHaveProperty("garageName");
            expect(garageCreation.body).toHaveProperty("_id");
            expect(garageCreation.body).toHaveProperty("cars");
            expect(garageCreation.body).toHaveProperty("likes");

            const getGarage = await request(server)
                .get("/api/garages/" + garageCreation.body._id)
            expect(getGarage.status).toBe(200);

            getGarage.body.garageName = 'e2eGarage2'
            const garageUpdate = await request(server)
                .put("/api/garages/" + garageCreation.body._id)
                .send({garageName: 'e2eGarage2'})
            expect(garageUpdate.status).toBe(200);
            expect(garageUpdate.body).toHaveProperty("garageName");
            expect(garageUpdate.body.garageName).toBe('e2eGarage2');
        });

        it("Garage Delete", async () => {
            const register = await request(server)
            .post("/api/register")
            .send(credentials)
            expect(register.status).toBe(201);

            const garageCreation = await request(server)
                .post("/api/garages")
                .send({garageName, email})
            expect(garageCreation.status).toBe(201);
            expect(garageCreation.body).toHaveProperty("garageName");
            expect(garageCreation.body).toHaveProperty("_id");
            expect(garageCreation.body).toHaveProperty("cars");
            expect(garageCreation.body).toHaveProperty("likes");

            const getGarage = await request(server)
                .get("/api/garages/" + garageCreation.body._id)
            expect(getGarage.status).toBe(200);

            const garageDelete = await request(server)
                .delete("/api/garages/" + garageCreation.body._id)
            expect(garageDelete.status).toBe(200);
            expect(garageDelete.body).toHaveProperty("acknowledged");
            expect(garageDelete.body).toHaveProperty("deletedCount");
            expect(garageDelete.body.acknowledged).toBe(true);
            expect(garageDelete.body.deletedCount).toBe(1);
        });


        it("Garage Like", async () => {
            const register = await request(server)
            .post("/api/register")
            .send(credentials)
            expect(register.status).toBe(201);

            const register2 = await request(server)
            .post("/api/register")
            .send(credentials2)
            expect(register2.status).toBe(201);

            const garageCreation = await request(server)
                .post("/api/garages")
                .send({garageName, email})
            expect(garageCreation.status).toBe(201);
            expect(garageCreation.body).toHaveProperty("garageName");
            expect(garageCreation.body).toHaveProperty("_id");
            expect(garageCreation.body).toHaveProperty("cars");
            expect(garageCreation.body).toHaveProperty("likes");

            const getGarage = await request(server)
                .get("/api/garages/" + garageCreation.body._id)
            expect(getGarage.status).toBe(200);

            const garageLike = await request(server)
                .get("/api/garages/like/" + garageCreation.body.garageName + "/" + credentials2.email)
            expect(garageLike.status).toBe(200);
        });

        it("Add Car to Garage", async () => {
            const register = await request(server)
            .post("/api/register")
            .send(credentials)
            expect(register.status).toBe(201);

            const garageCreation = await request(server)
                .post("/api/garages")
                .send({garageName, email})
            expect(garageCreation.status).toBe(201);
            expect(garageCreation.body).toHaveProperty("garageName");
            expect(garageCreation.body).toHaveProperty("_id");
            expect(garageCreation.body).toHaveProperty("cars");
            expect(garageCreation.body).toHaveProperty("likes");

            const getGarage = await request(server)
                .get("/api/garages/" + garageCreation.body._id)
            expect(getGarage.status).toBe(200);

            const brand = {
                name: "e2eBrand",
                established: 2020,
                countryOfOrigin: "e2eCountry",
                logoUrl: "e2eLogo",
                carModels: []
            }

            const addBrand = await request(server)
                .post("/api/brands")
                .send(brand)
            expect(addBrand.status).toBe(201);

            const carModel = {
                name: "e2eModel",
                brand: addBrand.body.name,
                imageUrl: "e2eImage",
                carType: "SUV"
            }

            const addCarModel = await request(server)
                .post("/api/carModels")
                .send(carModel)
            expect(addCarModel.status).toBe(201);

            const car = {
                brand: addBrand.body.name,
                numberPlate: 'e2eNumberPlate',
                country: 'e2eCountry',
                model: addCarModel.body.name,
            }

            const addCar = await request(server)
                .post("/api/cars")
                .send(car)
            expect(addCar.status).toBe(201);
            expect(addCar.body).toHaveProperty("brand");
            expect(addCar.body).toHaveProperty("carModel");
            expect(addCar.body).toHaveProperty("_id");

            const addCarToGarage = await request(server)
                .get("/api/garages/cars/add/" + addCar.body.numberPlate + "/" + register.body.email)
            expect(addCarToGarage.status).toBe(200);

        });

    });


    

  });  

