import { constants } from '../../../constants';

export class modelImage {
   static make = 'audi'
    static modelFamily = 'a3'
    static modelRange = 'a3'
    static modelVariant = 'od'
    static modelYear = '2019'
    static powerTrain = 'fuel'
    static transmission = '0'
    static bodySize = '5'
    static trim = 'eu'
    static paintId = 'pspc0004sspc0199'
    static angle = '10'

  static url = constants.carImageApiUrl
     +
    '&make=' + modelImage.make + 
    '&modelFamily=' + modelImage.modelFamily +
    '&modelRange=' + modelImage.modelRange + 
    '&modelVariant=' + modelImage.modelVariant + 
    '&modelYear=' + modelImage.modelYear + 
    '&powerTrain=' + modelImage.powerTrain + 
    '&transmission=' + modelImage.transmission  + 
    '&bodySize=' + modelImage.bodySize + 
    '&trim=' + modelImage.trim + 
    '&paintId=' + modelImage.paintId + 
    '&angle=' + modelImage.angle ;

  static getUrl(): string {
    return this.url;
  }
}
