import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findAll(id: string): Promise<User[]> {
    return this.userModel.find({ _id: { $ne: id } });
  }


//   async findAllCar(id: string): Promise<Car[]> {
//     const user = await this.userModel.findById(id).populate("cars");
//     return user.cars;
//   }

//   async deleteCar(userId: string, carId: string): Promise<void> {
//     return this.userModel.findByIdAndUpdate(userId, { $pull: { cars: carId } });
//   }

}