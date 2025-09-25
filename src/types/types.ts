export interface Product {
    name: string;
    price: number;
    description: string;
}


export interface User {
    name: string
    id: string
    email: string | null
    created_at: Date | null
    clerkId: string
}
