import { GarageInterface } from "../garage/garage.interface";

export interface UserInterface {
    username: string;
    email: string;
    roles: string[];
    garageName: string;
    likedGarages: string[];
}