
export enum CarType {
    SUV = 'SUV',
    Sedan = 'Sedan',
    Hatchback = 'Hatchback',
    Coupe = 'Coupe',
    Convertible = 'Convertible',
    Station = 'Station',
    Van = 'Van',
    Truck = 'Truck',
    Minivan = 'Minivan',
    Pickup = 'Pickup',
    Hybrid = 'Hybrid',
    Electric = 'Electric',
    Other = 'Other'

}

export class ModelInterface {
    id?: number = 0;
    name = '';
    carType = CarType.Other;
    // brand = '';
    imageUrl = '';
}