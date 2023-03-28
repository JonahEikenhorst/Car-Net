// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CarModel } from '../../../../../apps/data-api/src/app/carModel/carModel.schema'

export class CarInterface {
    numberPlate = '';
    country = '';
    brand = '';
    year = 0;
    carModel = CarModel;
}


