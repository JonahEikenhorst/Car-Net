
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

export interface CarModelInterface {
    name: string;
    carType: CarType;
    imageUrl: string;
    brand: string; // Index into Brand collection
}

