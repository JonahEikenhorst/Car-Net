import { Injectable } from '@nestjs/common';

import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Identity, IdentityDocument } from './identity.schema';
import { User, UserDocument } from '../user/user.schema';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly neo4jService: Neo4jService,
    ) {}

    async createUser(username: string, email: string): Promise<User> {
        const user = new this.userModel({username, email});
        await user.save();
        await this.neo4jService.write(`CREATE (u:User {userId: "${user['_id'].toString()}", username: "${user.username}"})`);
        return user;
      }

      async verifyToken(token: string): Promise<string | JwtPayload> {
        return new Promise((resolve, reject) => {
          verify(token.replace(/^Bearer\s/, ""), process.env.JWT_SECRET, (err, payload) => {
            if (err) reject(err);
            else resolve(payload);
          });
        });
      }

    async registerUser(username: string, password: string, email: string) {
        const saltrounds = await bcrypt.genSalt();
        const generatedHash = await hash(password, saltrounds);
    
        const user = await this.identityModel.findOne({ $or: [{ username }, { email }] });
        if (user) throw new Error("User registration failed");
    
        const identity = new this.identityModel({ username, hash: generatedHash, email });
        await identity.save();
      }

      async generateToken(email: string, password: string): Promise<Identity> {
        const identity = await this.identityModel.findOne({ email }, { __v: 0 });
        if (!identity || !(await compare(password, identity.hash))) throw new Error("User is not authorized");
    
        const user = await this.userModel.findOne({ email });
    
        return new Promise((resolve, reject) => {
          sign({ id: user.id }, process.env.JWT_SECRET, (err: Error, token: string) => {
            if (err) reject(err);
            else identity.token = token;
            resolve(identity);
          });
        });
      }
}