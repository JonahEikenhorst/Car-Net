import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.schema";
import { isEmail } from "class-validator";
import { InjectToken, Token } from "../auth/token.decorator";


@Controller("users")
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  async findAll(@InjectToken() token: Token): Promise<User[]> {
    return this.userService.findAll(token.id);
  }

  @Get(":identifier")
  async findOne(@Param("identifier") identifier: string): Promise<User> {
    if (isEmail(identifier)) {
      return this.userService.findOneByEmail(identifier);
    }
    return this.userService.findOne(identifier);
  }
}