
import { UserInterface } from "../user/user.interface";
import { CarInterface } from "../car/car.interface"; 

export interface GarageInterface {
    garageName: string;
    owner: UserInterface;
    likes: UserInterface[];
    cars: CarInterface[];


}

export interface RelationGarageInterface extends GarageInterface {
    userid: string;
}