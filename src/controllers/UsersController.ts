
import { Get, Post, Route, Tags } from "tsoa";
import { BaseController, MsgRes } from "./BaseController";
import { prisma } from "../../prisma/prisma";
import { User } from "../types/types";
import { randomUUID } from "crypto";

@Route("users")
@Tags("User")
export class UserController extends BaseController {
  @Get('/')
  public async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  @Post('/')
  public async createUser(): Promise<User | MsgRes> {
    const user = await prisma.user.create({
      data: {
        clerkId: randomUUID(),
        name: 'Admin',
        email: 'admin@gmail.com'
      }
    });
    if (!user) this.internalServerRes
    return this.msgRes("User Created");
  }

}