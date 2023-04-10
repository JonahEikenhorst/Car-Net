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
  let testUser: User;

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
    testUser = { username: 'TestUser', email: 'Test@gmail.com', roles: ['user'], likedGarages: [], garageName: 'Test Garage' };
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

  describe('owner', () => {
    it('should be of type User', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser });
      await expect(garage.validate()).resolves.not.toThrow();
    });

    it('should return an error if not of type User', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: 'Test' });
      await expect(garage.validate()).rejects.toThrow();
    });
  });

  describe('likes', () => {
    it('should be optional', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser, cars: [new Car()] });
      await expect(garage.validate()).resolves.not.toThrow();
    });
    it('should be an array of type User', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser, likes: [testUser] });
      await expect(garage.validate()).resolves.not.toThrow();
    });
  });

  describe('cars', () => {
    it('should be optional', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser });
      await expect(garage.validate()).resolves.not.toThrow();
    });
    it('should be an array of type Car', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser, cars: [new Car()] });
      await expect(garage.validate()).resolves.not.toThrow();
    });
  });

  describe('validate', () => {
    it('should return an error if garageName is not a string', async () => {
      const garage = new garageModel({ garageName: new User() });
      await expect(garage.validate()).rejects.toThrow();
    });
    it('should return an error if garageName is not provided', async () => {
      const garage = new garageModel();
      await expect(garage.validate()).rejects.toThrow();
    });
  });
  describe('save', () => {
    it('should save a garage', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser });
      await expect(garage.save()).resolves.not.toThrow();
    });
    it('should save a garage with cars', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser, cars: [new Car()] });
      await expect(garage.save()).resolves.not.toThrow();
    });
    it('should save a garage with likes', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser, likes: [testUser] });
      await expect(garage.save()).resolves.not.toThrow();
    });
    it('should save a garage with cars and likes', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser, cars: [new Car()], likes: [testUser] });
      await expect(garage.save()).resolves.not.toThrow();
    });
    it('should return an error if garageName is not a string', async () => {
      const garage = new garageModel({ garageName: new User() });
      await expect(garage.save()).rejects.toThrow();
    });
    it('should return an error if garageName is not provided', async () => {
      const garage = new garageModel();
      await expect(garage.save()).rejects.toThrow();
    });
  });
  describe('update', () => {
    it('should update a garage', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser });
      await garage.save();
      await expect(garage.update({ garageName: 'Test2' })).resolves.not.toThrow();
    });
    it('should update a garage with cars', async () => {
      const garage = new garageModel({ garageName: 'Test', owner: testUser, cars: [new Car()] });
      await garage.save();
      await expect(garage.update({ garageName: 'Test2' })).resolves.not.toThrow();
    });
})
});