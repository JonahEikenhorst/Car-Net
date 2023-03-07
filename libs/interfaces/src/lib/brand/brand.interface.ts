//TIJDELIJK DUBBEL

import { Model } from '../../../../../apps/data-api/src/app/model/model.schema';

export class BrandInterface {
    id?: number = 0;
    name = '';
    established: Date = new Date();
    countryOfOrigin = '';
    // brands: brand[] = [];
    models: Model[] = [];
    logoUrl = '';
}

