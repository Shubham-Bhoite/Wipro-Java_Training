import { Routes } from '@angular/router';
import { Login } from '../login/login.component';
import { FoodList } from '../food-list/food-list.component';
import { OrderPage } from '../order-page/order-page.component';
import { PaymentComponent } from '../payment/payment.component';

export const routes: Routes = [
    {path: '' , component : Login},
    {path: 'login', component: Login},
    {path:'food', component:FoodList},
     {path:'orders', component:OrderPage},
    {path:'payment/:orderId/:orderPrice', component: PaymentComponent}
];


