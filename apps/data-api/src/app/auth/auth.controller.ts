import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import * as password from "password-hash-and-salt";	
import * as jwt from "jsonwebtoken";
import { Model } from "mongoose";


@Controller("login")
export class AuthController {

    constructor(@InjectModel("User") private userModel: Model) {

    }

    @Post()
    async login(@Body("email") email:string, 
        @Body("password") plaintextPassword:string) {
            
            const user = await this.userModel.findOne({email});

            if (!user) {
                throw new UnauthorizedException("User not found");
            }

            return new Promise((resolve, reject) => {
                password(plaintextPassword).verifyAgainst(user.passwordHash, (err, verified) => {
                    if (!verified) {
                        reject(new UnauthorizedException("Invalid password"));
                    }

                    const authJwtToken = jwt.sign({email, roles: user.roles}, process.env.JWT_SECRET);
                    resolve({authJwtToken});
                });
            } )
            
        }
}

// import {
//     BadRequestException,
//     Body,
//     Controller,
//     Post,
//     UnauthorizedException
//   } from "@nestjs/common";
//   import { AuthService } from "./auth.service";
//   import { UserCredentials, UserRegistration } from '@car-net/entity-ui/components/src/lib/auth/auth.model';
//   import { User } from "../user/user.schema";
//   import { Identity } from "./identity.schema";
  
//   @Controller()
//   export class AuthController {
//     constructor(private readonly authService: AuthService) {
//     }
  
//     @Post("register")
//     async register(@Body() credentials: UserRegistration): Promise<User> {
//       try {
//         await this.authService.registerUser(credentials.username, credentials.password, credentials.email);
  
//         return await this.authService.createUser(credentials.username, credentials.email);
//       } catch (e) {
//         throw new BadRequestException(e.message);
//       }
//     }
  
//     @Post("login")
//     async login(@Body() credentials: UserCredentials): Promise<Identity> {
//       try {
//         const identity = await this.authService.generateToken(credentials.email, credentials.password);
//         identity.hash = undefined;
//         return identity;
//       } catch (e) {
//         throw new UnauthorizedException("Invalid credentials");
//       }
//     }
  
//     @Post("verify")
//     async verify(@Body() token: string): Promise<boolean> {
//       return this.authService.verifyToken(token);
//     }
//   }