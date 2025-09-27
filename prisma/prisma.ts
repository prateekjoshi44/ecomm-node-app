import { PrismaClient } from '../generated/prisma'

export const prisma = new PrismaClient()

export enum OrderStatus {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}
