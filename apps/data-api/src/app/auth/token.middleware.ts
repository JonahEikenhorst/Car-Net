
import { Injectable, NestMiddleware } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import {Request, Response} from "express";



@Injectable()
export class TokenMiddleware implements NestMiddleware {
  
    use(req: Request, res: Response, next: () => void) {
        const authJwtToken = req.headers.authorization;

        if (!authJwtToken) {
            next();
            return;
        }

        try {
            const user = jwt.verify(authJwtToken, process.env.JWT_SECRET);

            if (user ) {
                console.log("User is authenticated", user);
                req["user"] = user;
            }
        }
        catch(err) {
            console.log("Error verifying token", err);
        }
        next();
    }

}

