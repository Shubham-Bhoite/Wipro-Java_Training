import { Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { ProductdeleteComponent } from './productdelete/productdelete.component';
import { OrderCompComponent } from './order-comp/order-comp.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const routes: Routes = [
{ path: '', component: ProductlistComponent },
  { path: 'productlist', component: ProductlistComponent },
  { path: 'productadd', component: ProductaddComponent },
  { path: 'productedit/:id', component: ProducteditComponent },
  { path: 'productdelete/:id', component: ProductdeleteComponent },
  {path:'order', component:OrderCompComponent},
  {path:'orderhistory', component:OrderHistoryComponent}
];
