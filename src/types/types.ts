export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface User {
    name: string
    id: string
    email: string | null
    created_at: Date | null
    clerkId: string
}

export interface OrderItem {
    id: string
    quantity: number
    price: number
    orderId: string
    productId: String
}
export interface Order {
    id: string
    status: string // pending, shipped, delivered, cancelled
    createdAt: Date
    total: number
    items: Product[]
}


// dto/order.dto.ts
export interface CreateOrderDto {
    total: number;
    userId: string;
    items: {
        productId: string;
        quantity: number;
        price: number; // store snapshot of price at order time
    }[];
}
