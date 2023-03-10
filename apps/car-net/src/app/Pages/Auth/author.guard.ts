import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";


@Injectable()
export class AuthorGuard implements CanActivate {

    constructor(private allowedRoles:string[]) {

    }

    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp(),
        request = host.getRequest();

        const user = request["user"];
        const allowed = this.isAllowed(user.roles);
        console.log("user is allowed: ", allowed);

        if (!allowed) {
            throw new ForbiddenException("User is authenticated but not authorized.");
        }
        console.log("User is authorized, allowing access.")
        return true;
    }

    isAllowed(userRoles:string[]) {
        console.log("Comparing roles: ", this.allowedRoles, userRoles);
        let allowed = false;
        userRoles.forEach(userRole => {
            console.log("Checking if Role is allowed: ", userRole);
            if (!allowed && this.allowedRoles.includes(userRole)) {
                allowed = true;
            }
        });
        return allowed;
    }
}