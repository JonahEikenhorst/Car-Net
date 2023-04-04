import { CarModelInterface } from "../carModel/carModel.interface";

export interface BrandInterface {
    name: string;
    established: string;
    countryOfOrigin: string;
    carModels: CarModelInterface[];
    logoUrl: string;
}
