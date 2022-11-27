import { brand } from '../../lib/brand/brand.model';

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

export class model {
    name = '';
    carType = CarType ;
    brand = brand;
    imageUrl = '';
}