import {Schema} from "@nestjs/mongoose";

@Schema()
export class Token_Identity {
  token: string;
  _id: string;
}