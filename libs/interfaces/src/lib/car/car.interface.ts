// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { CarModel } from '../../../../../apps/data-api/src/app/carModel/carModel.schema'

import { CarModelInterface } from "../carModel/carModel.interface";

export interface CarInterface {
    numberPlate: string;
    country: string;
    brand: string;
    year: number;
    carModel: CarModelInterface;
}
