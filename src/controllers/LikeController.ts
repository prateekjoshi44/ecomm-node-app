import { Body, Post, Route, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { prisma } from "../../prisma/prisma";

@Route("like")
@Tags("Like")
export class LikeController extends BaseController {

    @Post('/')
    public async createOrder(@Body() body: { productId: string, userId: string }) {

        const { productId, userId } = body
        const like = await prisma.like.findUnique({
            where: {
                productId_userId: body
            }
        })
        if (!like) {
            await prisma.like.create({
                data: { productId, userId }
            })
            return this.msgRes(`Product liked`)
        }
        else {
            await prisma.like.delete({
                where: {
                    productId_userId: body
                }
            })
        }
        return this.msgRes(`Product unliked`)

    }
}