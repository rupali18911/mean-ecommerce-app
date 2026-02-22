import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ProductComponent } from './components/product/product';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'login', component : Login },
    { path: 'register', component : Register },
    { path : 'products', component : ProductComponent, canActivate: [AuthGuard] },
];
