import { Body, Post, Route, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { prisma } from "../../prisma/prisma";

@Route("like")
@Tags("Like")
export class LikeController extends BaseController {

    @Post('/')
    public async createOrder(@Body() productId: string) {

        const like = await prisma.like.create({
            data: { productId }
        })
        return this.msgRes(`Product ${like.productId} added to liked`)
    }
}