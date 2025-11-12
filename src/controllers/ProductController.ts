
import { Body, Delete, Get, Patch, Post, Query, Route, Tags } from "tsoa";
import { BaseController, MsgRes } from "./BaseController";
import { Product } from "../types/types";
import { prisma } from "../../prisma/prisma";

@Route("product")
@Tags("Product")
export class ProductController extends BaseController {

    @Get("/")
    public async getProducts(@Query() id?: string): Promise<Product | Product[] | MsgRes> {
        if (id) {
            const product = await prisma.product.findUnique({
                where: {
                    id
                },
                include: {
                    upload: true, like: true
                }
            })
            if (!product) return this.notFoundRes("Product not found");
            return product;
        }
        return await prisma.product.findMany({
            include: {
                upload: true, like: true
            }
        });
    }

    @Post('/')
    public async createProduct(@Body() body: Omit<Product, 'created_at' | 'updated_at' | 'id'>): Promise<MsgRes | Product> {
        const { name, description, price } = body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price
            },
        })
        this.setStatus(201)
        return product
    }

    @Patch('/')
    public async updateProduct(@Query() id: string, @Body() body: Product): Promise<MsgRes | Product> {
        const { name, description, price } = body;

        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                description,
                price
            },
        })
        this.setStatus(200)
        return product
    }

    @Delete('/')
    public async delteProduct(@Query() id: string): Promise<MsgRes | Product> {

        await prisma.product.delete({
            where: {
                id
            },

        })
        this.setStatus(200)
        return this.msgRes("Product deleted successfully")
    }

}