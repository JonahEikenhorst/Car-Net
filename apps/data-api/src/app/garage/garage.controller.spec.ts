import { Test, TestingModule } from '@nestjs/testing';
import { GarageController } from './garage.controller';
import { GarageService } from './garage.service';
import { Garage } from './garage.schema';
import { User } from '../user/user.schema';

describe('GarageController', () => {
  let controller: GarageController;
  let service: GarageService;
  let testUser: User;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [GarageController],
      providers: [{
        provide: GarageService,
        useValue: {
          addGarage: jest.fn(),
          findAll: jest.fn(),
          updateGarage: jest.fn(),
          deleteGarage: jest.fn(),
        },
        }],
    }).compile();

    controller = app.get<GarageController>(GarageController);
    service = app.get<GarageService>(GarageService);
    testUser = { username: 'TestUser', email: 'Test@gmail.com', roles: ['user'] };

  });

  describe('createGarage', () => {
    it('should create a new garage', async () => {
      const newGarage: Partial<Garage> = {
        garageName: 'Test Garage',
        owner: testUser,
        likes: [],
        cars: [],
      };
      const createdGarage: Garage = {
        garageName: 'Test Garage',
        owner: testUser,
        likes: [],
        cars: [],
      };

      jest.spyOn(service, 'addGarage').mockResolvedValueOnce(createdGarage);

      const result = await controller.createGarage(newGarage);

      expect(result).toEqual(createdGarage);
    });
  });

  describe('findAllGarages', () => {
    it('should return an array of garages', async () => {
      const garages: Garage[] = [];

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(garages);

      const result = await controller.findAllGarages();

      expect(result).toEqual(garages);
    });
  });

  describe('updateGarage', () => {
    it('should update an existing garage', async () => {

      const changes = {
        garageName: 'Test Garage',
        owner: testUser,
        likes: [],
        cars: [],
      };
      const updatedGarage = {
        garageName: 'Test Garage1',
        owner: testUser,
        likes: [],
        cars: [],

      };

      jest
        .spyOn(service, 'updateGarage')
        .mockResolvedValueOnce(updatedGarage);

      const result = await controller.updateGarage('123', changes);

      // expect(result.garageName).toEqual(firstGarage.garageName);
      expect(result.garageName).toEqual(updatedGarage.garageName);

    });
  });

//   describe('deleteGarage', () => {
//     it('should delete an existing garage', async () => {
//       const garageId = '1';

//       jest.spyOn(service, 'deleteGarage').mockResolvedValueOnce(undefined);

//       const result = await controller.deleteGarage(garageId);

//       expect(result).toBeUndefined();
//     });
//   });
});