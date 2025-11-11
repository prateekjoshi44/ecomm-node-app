import { Body, Get, Patch, Post, Query, Route, Tags } from "tsoa";
import { BaseController, MsgRes } from "./BaseController";
import { CreateOrderDto, Order } from "../../src/types/types";
import { prisma } from "../../prisma/prisma";
import { OrderStatus } from "../Constants/enums";

@Route("order")
@Tags("Order")
export class OrderController extends BaseController {
    @Get("/")
    public async getOrders(@Query() id?: string): Promise<Order | Order[] | MsgRes | unknown> {
        if (id) {
            const order = await prisma.order.findUnique({
                where: {
                    id
                },
                include: {
                    items: true
                }

            })
            if (!order) return this.notFoundRes("order not found");
            return order;
        }
        return await prisma.order.findMany({
            include: {
                items: true
            }
        });
    }

    @Post('/')
    public async createOrder(@Body() body: CreateOrderDto): Promise<MsgRes | unknown> {

        const { total, userId, items } = body

        const order = await prisma.order.create({
            data: {
                total: total,
                userId: userId,
                items: {
                    create: items.map(i => ({
                        quantity: i.quantity,
                        price: i.price,
                        product: { connect: { id: i.productId } }
                    }))
                }
            },
            include: {
                items: { include: { product: true } }
            }
        });

        return order;
    }

    @Patch('/')
    public async updateOrderStatus(@Body() body: { id: string, status: OrderStatus }): Promise<MsgRes | unknown> {

        const { id, status } = body

        const order = await prisma.order.update({
            where: {
                id
            },
            data: {
                status
            }
        });

        return order;
    }

}