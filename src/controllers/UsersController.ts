
import { Get, Route, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { prisma } from "../../prisma/prisma";
import { User } from "../types/types";

@Route("users")
@Tags("User")
export class UserController extends BaseController {
  @Get('/')
  public async getAllUsers(): Promise<User[]> {
    const users = await prisma.users.findMany();
    return users;
  }

}