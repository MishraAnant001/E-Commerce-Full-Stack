import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service:UserServiceService,
    private router:Router
  ) { }
  submitted = false
  signupform!: FormGroup
  ngOnInit(): void {
    this.signupform = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    })
  }

  get f() {
    return this.signupform.controls
  }
  submitForm() {

    this.submitted = true
    if(this.signupform.valid){
      console.log(this.signupform.value)
      this.service.registerUser(this.signupform.value).subscribe({
        next:(response)=>{
          Swal.fire({
            icon: "success",
            title: "user registered successfully",
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.router.navigate([''])
          });
        },
        error:(error)=>{
          console.log(error)
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text:`${error.error.message}`,
          });
        }
      })
    }
  }
  resetForm(){
    this.submitted = false
    this.signupform.reset()
  }

}
