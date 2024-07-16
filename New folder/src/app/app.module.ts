import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './components/admin/admin.component';
import { ProductComponent } from './components/admin/product/product.component';
import { CategoriesComponent } from './components/admin/categories/categories.component'
import { TableModule } from 'primeng/table';
import { ShowProductComponent } from './components/home/show-product/show-product.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {ChartModule} from "primeng/chart"
import { CartComponent } from './components/cart/cart.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ConfirmationService } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    AdminComponent,
    ProductComponent,
    CategoriesComponent,
    ShowProductComponent,
    CartComponent,
    InternalServerErrorComponent,
    NotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      timeOut:3000,
      closeButton:true,
      tapToDismiss:false,
      easing:"ease-in",
      easeTime:300,
      progressBar:true,
    }),
    ConfirmDialogModule,
    AngularToastifyModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ChartModule,
    BrowserAnimationsModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true
  },{
    provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true
  },
  ToastService,
  ConfirmationService

],
  bootstrap: [AppComponent]
})
export class AppModule { }
