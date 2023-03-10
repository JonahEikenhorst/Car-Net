/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CarModel } from "./carModel.schema";

@Injectable()
export class CarModelService {

    constructor(@InjectModel('Model') private carModelModel: Model<CarModel>) {
    }

    async findAll(): Promise<CarModel[]> {
      return this.carModelModel.find();
  }

  async updateCarModel(id: string, changes: Partial<CarModel>): Promise<CarModel> {

      return this.carModelModel.findOneAndUpdate({_id: id}, changes,{new:true});
  }

  async deleteCarModel(id: string) {
      return this.carModelModel.deleteOne({_id: id});
  }

  async addCarModel(carModel: Partial<CarModel>): Promise<CarModel> {
      const newCarModel = new this.carModelModel(carModel);
      await newCarModel.save();
      return newCarModel.toObject({versionKey: false});
  }
}





// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { CarType, ModelInterface } from '@car-net/interfaces';
// import { Model } from './model.schema';
// // import { ModelDetailComponent } from 'apps/car-net/src/app/Components/model/model-detail/model-detail.component';
// import { modelImage } from './modelImageHandler';
// import { model } from 'mongoose';



// @Injectable({
//   providedIn: 'root',
// })
// export class ModelService {
//   private model?: Model;
//   private modellist: Model[] = [
//     {
//         id: 1,
//         name: 'A3',
//         carType: CarType.Hatchback,
//         // carModel: 'Audi',
//         imageUrl: modelImage.getUrl(),
//     },
//   ];

//   modelId: number = this.modellist.length;

//   constructor() {console.log('modelService aangemaakt');}

//   getList(): Observable<Model[]> {
//     console.log('model getList aangeroepen');
//     console.log(this.modellist);
//     return of(this.modellist);
//   }

//   getById(id: number): Observable<Model> {
//     console.log('model getById aangeroepen');
//     console.log(`model met ID ${id} gezocht`);
//     return of(this.modellist.filter((item) => item.id === id)[0]);
//   }

//   create(model: Model): Observable<any> {
//     console.log('model create aangeroepen');
//     this.model = { ...model };
//     this.model.id = ++this.modelId;
//     this.modellist.push(this.model);
//     console.log(`Nieuwe model toegevoegd met ID ${this.modelId}`);
//     return of({
//       status: 201,
//       message: 'success',
//     });
//   }

//   update(model: Model): Observable<any> {
//     console.log('model update aangeroepen');
//     this.model = { ...model };
//     this.modellist.splice(this.modellist.findIndex(b => b.id === model.id), 1, this.model);
//     console.log(`model met ID ${model?.id} geüpdatet`);
//     return of({
//       status: 201,
//       message: 'success',
//     });
//   }

//   delete(modelId: number): Observable<any> {
//     this.modellist.splice(this.modellist.findIndex(t => t.id === modelId), 1);
//     console.log(`model met ID ${modelId} verwijderd`);
//       return of ({
//         status: 201,
//         message: 'success',
//       });
//     }
// }