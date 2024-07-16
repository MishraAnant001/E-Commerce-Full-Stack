import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ToastService } from 'angular-toastify';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private service: UserServiceService,
    private router: Router,
    private _toastService: ToastService
  ) { }
  loginform!: FormGroup
  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: [''],
      password: [''],
    })
  }

  submitForm() {
    if (this.loginform.valid) {
      // console.log(this.loginform.value)
      this.service.loginUser(this.loginform.value).subscribe({
        next: (response: any) => {
          // console.log(response)
          this._toastService.success("login successfull!");
          const user = response.body.data.user
          if (user.role == "user") {
            this.router.navigate([''])
            localStorage.setItem("isAdmin", JSON.stringify(false))
          } else {
            localStorage.setItem("isAdmin", JSON.stringify(true))
            this.router.navigate(['admin/dashboard'])
          }
          localStorage.setItem("token", response.body.data.token)
        },
        error: (error) => {
          console.log(error)
          this._toastService.error(error.error.message)
        }
      })
    }
  }
}
