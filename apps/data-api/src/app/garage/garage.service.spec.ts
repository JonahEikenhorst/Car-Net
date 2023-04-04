import { Test } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Garage, GarageDocument, GarageSchema } from './garage.schema';
import { GarageService } from './garage.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { disconnect, Model } from 'mongoose';
import { User, UserDocument, UserSchema } from '../user/user.schema';
import { CarService } from '../car/car.service';
import { Car, CarSchema } from '../car/car.schema';
import { UserService } from '../user/user.service';
import { Neo4jService } from 'nest-neo4j/dist';
import { CarModelService } from '../carModel/carModel.service';
import { CarModel, CarModelSchema } from '../carModel/carModel.schema';

describe('GarageService', () => {
  let service: GarageService;

  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  
  let garageModel: Model<GarageDocument>;
  let userModel: Model<UserDocument>;
  let carModel: Model<Car>;
  let carModelModel: Model<CarModel>;

  beforeAll(async () => {
    let uri: string;

    jest.mock('neo4j-driver/lib/driver')
    
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return {uri};
          },
        }),
        MongooseModule.forFeature([{ name: Garage.name, schema: GarageSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
        MongooseModule.forFeature([{ name: CarModel.name, schema: CarModelSchema }])
      ],
      providers: [GarageService, CarService, CarModelService, UserService, { provide: Neo4jService, useValue: {write: jest.fn(), read: jest.fn()}}],
    }).compile();

    service = app.get<GarageService>(GarageService);

    garageModel = app.get<Model<GarageDocument>>(getModelToken(Garage.name));
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    carModel = app.get<Model<Car>>(getModelToken(Car.name));
    carModelModel = app.get<Model<CarModel>>(getModelToken(CarModel.name));

    await garageModel.ensureIndexes();
    await userModel.ensureIndexes();
    await carModel.ensureIndexes();
    await carModelModel.ensureIndexes();

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('garages').deleteMany({});
    await mongoc.db('test').collection('users').deleteMany({});
    await mongoc.db('test').collection('cars').deleteMany({});
    await mongoc.db('test').collection('carModels').deleteMany({});
  })

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  describe('find garage(s)', () => {
    it('should return an array of garages', async () => {
      const garage = await service.addGarage('Garage 1');
      const garages = await service.findAll();
      expect(garages[0]).toHaveProperty('garageName', garage.garageName);
    });

    it('should return a garage by id', async () => {
      const garage = await service.addGarage('Garage 1');
      const result = await service.findOne(garage['_id']);
      expect(result).toHaveProperty('garageName', garage.garageName);
    });
  });

  describe('updateGarage', () => {
    it('should update a garage by id', async () => {
      const garage = await service.addGarage('Garage 1');
      const changes = { garageName: 'Garage 2' };
      const result = await service.updateGarage(garage['_id'], changes);
      expect(result).toHaveProperty('garageName', changes.garageName);
    });
  });

  describe('deleteGarage', () => {
    it('should delete a garage by id', async () => {
      const garage = await service.addGarage('Garage 1');
      const result = await service.deleteGarage(garage['_id']);
      expect(result).toHaveProperty('deletedCount', 1);
      expect(result).toHaveProperty('acknowledged', true);
    });
  });

  describe('addGarage', () => {
    it('should add a new garage', async () => {
      const garage = await service.addGarage('Garage 1');
      expect(garage).toHaveProperty('garageName', 'Garage 1');
    });
  });
});