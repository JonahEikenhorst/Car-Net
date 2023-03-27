import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Garage, GarageDocument } from './garage.schema';
import { GarageService } from './garage.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';

describe('GarageService', () => {
  let module: TestingModule;
  let service: GarageService;
  let garageModel: Model<GarageDocument>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        GarageService,
        {
          provide: getModelToken('Garage'),
          useValue: {
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
            save: jest.fn(),
            toObject: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GarageService>(GarageService);
    garageModel = module.get<Model<GarageDocument>>(getModelToken('Garage'));
  });

  afterAll(async () => {
    await module.close();
  });

  describe('findAll', () => {
    it('should return an array of garages', async () => {
      const garages = [{ garageName: 'Garage 1' }, { garageName: 'Garage 2' }];
      jest.spyOn(garageModel, 'find').mockResolvedValueOnce(garages);

      const result = await service.findAll();
      expect(result).toEqual(garages);
      console.log(result)
    });
  });

  describe('updateGarage', () => {
    it('should update a garage by id', async () => {
      const garage = { _id: '123', garageName: 'Garage 1' };
      const changes = { garageName: 'Garage 2' };
      jest.spyOn(garageModel, 'findOneAndUpdate').mockResolvedValueOnce(garage);

      const result = await service.updateGarage('123', changes);
      expect(result.garageName).toEqual(changes.garageName);
    });
  });

//   describe('deleteGarage', () => {
//     it('should delete a garage by id', async () => {
//       jest.spyOn(garageModel, 'deleteOne').mockResolvedValueOnce({});

//       await service.deleteGarage('123');
//       expect(garageModel.deleteOne).toHaveBeenCalledWith({ _id: '123' });
//     });
//   });

//   describe('addGarage', () => {
//     it('should add a new garage', async () => {
//       const garage = { garageName: 'Garage 1' };
//       const newGarage = { _id: '123', garageName: 'Garage 1' };
//       jest.spyOn(garageModel, 'save').mockResolvedValueOnce(newGarage);
//       jest.spyOn(garageModel, 'toObject').mockReturnValueOnce(newGarage);

//       const result = await service.addGarage(garage);
//       expect(result).toEqual(newGarage);
//     });
//   });
});