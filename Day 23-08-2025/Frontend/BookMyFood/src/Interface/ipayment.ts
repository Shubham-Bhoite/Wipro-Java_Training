export interface IPayment {

     id?:number;
	 orderId:string;
	 totalOrderPrice:number;
	 paymentStatus?:string;
	 modeOfPayment:string; 
	 accountNumber:string;
	 cvv:number;
}