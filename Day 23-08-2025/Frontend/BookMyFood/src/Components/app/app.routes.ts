import { Routes } from '@angular/router';
import { Login } from '../login/login.component';
import { FoodList } from '../food-list/food-list.component';

export const routes: Routes = [
    {path: '' , component : Login},
    {path: 'login', component: Login},
    {path:'food', component:FoodList}
];