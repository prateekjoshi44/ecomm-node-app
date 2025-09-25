
import { Body, Get, Post, Query, Route, Tags } from "tsoa";
import { BaseController, MsgRes } from "./BaseController";
import { Product } from "../types/types";
import { prisma } from "../../prisma/prisma";

@Route("product")
@Tags("Product")
export class ProductController extends BaseController {

    @Get("/")
    public async getProducts(@Query() id?: string): Promise<Product | Product[]> {
        if (id) {
            const product = await prisma.products.findUnique({
                where: {
                    id
                },
            })
            if (product) return product;
        }
        return await prisma.products.findMany();
    }

    @Post('/')
    public async createProduct(@Body() body: Product): Promise<MsgRes | Product> {
        const { name, description, price } = body;

        await prisma.products.create({
            data: {
                name,
                description,
                price
            },
        })
        this.setStatus(201)
        return this.msgRes("Product created successfully")
    }

}