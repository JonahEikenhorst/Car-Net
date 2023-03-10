import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp(),
        request = host.getRequest();

        const user = request["user"];
        if(!user) {
            throw new UnauthorizedException("User not authenticated.");
        }

        console.log("User is authenticated.");
        return true;
    }
}