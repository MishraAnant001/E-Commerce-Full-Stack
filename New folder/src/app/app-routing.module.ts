import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductComponent } from './components/admin/product/product.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authguardGuard } from './auth/authguard.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"",
    title:"home",
    component:HomeComponent,
  },
  {
    path:"internal-error",
    title:"home",
    component:InternalServerErrorComponent,
  },
  {
    path:"cart",
    component:CartComponent,
    canDeactivate:[authguardGuard]
  },
  {
    path:"login",
    title:"login",
    component:LoginComponent
  },
  {
    path:"signup",
    title:"signup",
    component:SignupComponent
  },
  {
    path:"admin",
    title:"admin",
    component:AdminComponent,
    canActivate:[authguardGuard],
    children:[
      {
        path:"product",
        component:ProductComponent
      },
      {
        path:"category",
        component:CategoriesComponent
      },
      {
        path:"dashboard",
        component:DashboardComponent
      }
      
    ],
    
  },
  {
    path:"**",
    title:"not-found",
    component:NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
