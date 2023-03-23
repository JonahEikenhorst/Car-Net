import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export type IdentityDocument = Identity & Document;

@Schema()
export class Identity {
    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Prop({required: true})
    hash: string;

    @Prop({
        required: true,
        unique: true,
        validate: {
          validator: (email:string) => isEmail(email),
          message: (email) => `${email.value} should be a valid email address`,
        }
      })
      email: string;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);