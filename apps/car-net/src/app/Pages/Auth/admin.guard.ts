import { AuthorGuard } from "./author.guard";


export class AdminGuard extends AuthorGuard {
    constructor() {
        super(["ADMIN"]);
    }
}