// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const environment = {
  production: true,
  carImageApiUrl: process.env?.['CARIMAGE_API_URL'],
};
