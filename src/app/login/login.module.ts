import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'resetpassword', component: ResetPasswordComponent }
];
@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forChild(routes)
    
  ],
  exports:[
    LoginComponent,
    FormsModule,
    ResetPasswordComponent,
    ReactiveFormsModule
    
  ]
})
export class LoginModule {}
