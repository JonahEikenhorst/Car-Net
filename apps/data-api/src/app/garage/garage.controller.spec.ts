import { Test, TestingModule } from '@nestjs/testing';
import { GarageController } from './garage.controller';
import { GarageService } from './garage.service';
import { Garage } from './garage.schema';
import { User } from '../user/user.schema';
import { HttpException } from '@nestjs/common';

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      jest.spyOn(service, 'findAll').mockImplementation(async() => { return [{ _id: "djijsisijj" ,garageName: 'Garage 1', owner: testUser, likes: [], cars: [] }, { _id: "hjdsuhu", garageName: 'Garage 2', owner: testUser, likes: [], cars: [] }]} );
      const result = await controller.findAllGarages();
      expect(result).toHaveLength(2);
    });

    it('should return http status 404 if no garages are found', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async() => { return []});

      try {
        await controller.findAllGarages();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
        expect(error.message).toBe('No garages found');
      }
    });
  });

  describe('updateGarage', () => {
    it('should update an existing garage', async () => {
      jest.spyOn(service, 'updateGarage').mockImplementation(async() => { return { _id: "djijsisijj" , garageName: 'Test Garage', owner: testUser, likes: [], cars: [] }});
      const result = await controller.updateGarage("djijsisijj", { garageName: 'Test Garage' });
      expect(result.garageName).toEqual('Test Garage');
    });

    it('should return http status 400 if no garage id is provided', async () => {
      try {
        await controller.updateGarage("", { garageName: 'Test Garage' });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(400);
        expect(error.message).toBe('No garage id provided');
      }
    });

    it('should return http status 400 if no garage data is provided', async () => {
      try {
        await controller.updateGarage("djijsisijj", {});
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(400);
        expect(error.message).toBe('No garage data provided');
      }
    });
  });

  describe('deleteGarage', () => {
    it('should delete an existing garage', async () => {
      const _id = "1";

      jest.spyOn(service, 'deleteGarage').mockImplementation(async() => { return { acknowledged: true, deletedCount: 1 }});
      const result = await controller.deleteGarage(_id);

      expect(result).toEqual({ acknowledged: true, deletedCount: 1 });
    });

    it('should return http status 400 if no garage id is provided', async () => {
      try {
        await controller.deleteGarage("");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(400);
        expect(error.message).toBe('No garage id provided');
      }
    });
  });
});