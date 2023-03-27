/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Garage, GarageDocument, GarageSchema } from './garage.schema';
import { User } from '../user/user.schema';
import { Car } from '../car/car.schema';
import { Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";

describe('GarageSchema', () => {
  let mongo: MongoMemoryServer;
  let garageModel: Model<GarageDocument>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongo = await MongoMemoryServer.create();
            const uri = mongo.getUri();
            return { uri };
          }
        }),
        MongooseModule.forFeature([{ name: Garage.name, schema: GarageSchema }])
      ]
    }).compile();
    garageModel = app.get<Model<GarageDocument>>(getModelToken(Garage.name));
  });

  afterAll(async () => {
    await disconnect();
    await mongo.stop();
  });

  it('should be defined', () => {
    expect(garageModel).toBeDefined();
  });

  describe('garageName', () => {
    it('should be required', async () => {
      const garage = new garageModel();
      const err = garage.validateSync();
      await expect(err.errors.garageName).toBeDefined();
    });

    it('should convert integer to string', async () => {
      const garage = new garageModel({ garageName: 123});
      await expect(typeof garage.garageName).toBe('string');
      await expect(garage.garageName).toEqual('123');
    });
  });

  // describe('owner', () => {
  //   it('should be required', async () => {
  //     const garage = new garageModel({ garageName: 'Test', cars: [new Car()] });
  //     await expect(garage.validate()).rejects.toThrow();
  //   });
  // });

  // describe('likes', () => {
  //   it('should be optional', async () => {
  //     const garage = new garageModel({ garageName: 'Test', owner: new User(), cars: [new Car()] });
  //     await expect(garage.validate()).resolves.not.toThrow();
  //   });
  // });

  // describe('cars', () => {
  //   it('should be optional', async () => {
  //     const garage = new garageModel({ garageName: 'Test', owner: new User() });
  //     await expect(garage.validate()).resolves.not.toThrow();
  //   });
  // });
});