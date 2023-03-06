//TIJDELIJK DUBBEL

import { model } from "../model/model.model";

export class brand {
    id?: number = 0;
    name = '';
    established: Date = new Date();
    countryOfOrigin = '';
    brands: brand[] = [];
    models: model[] = [];
    logoUrl = '';
}
    // // models: model[];

