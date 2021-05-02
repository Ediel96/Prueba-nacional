import { RouterModule, Routes } from '@angular/router';
import {ClienteComponent} from './cliente/cliente.component';
import { FormComponent} from './cliente/form/form.component';


const APP_ROUTES: Routes =[
  {path: '', redirectTo: '/user', pathMatch: 'full'},
  {path: 'user', component: ClienteComponent},
  {path: 'user/form', component: FormComponent},
  {path: 'user/form/:id', component: FormComponent},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:false});
