import { OrderItem } from "./order-item";

export interface Order {

    id?:number;
    orderId?:string;
    orderValue?:number;
    userId?:string;
    orderTime?:Date;
    orderStatus?:string;
    items:OrderItem[];
}