
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const environment = {
  production: false,
  carImageApiUrl: process.env?.['CARIMAGE_API_URL'],

};
