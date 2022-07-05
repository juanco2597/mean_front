import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})
export class RegisterScreenComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    username: ["test 8", [Validators.required, Validators.minLength(3)]],
    email: ["test8@mail.com", [Validators.required, Validators.email]],
    password: ["123456", [Validators.required, Validators.minLength(6)]],
    password2: ["123456", [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    const {password, password2} = this.miFormulario.value

    if(password === password2){
      this.authService.register(this.miFormulario.value).subscribe((res) =>{
        if(res === true){
          localStorage.setItem('user', JSON.stringify(this.authService.user));
          this.router.navigateByUrl("/task")
        }else{
          Swal.fire({
            title:"Error",
            icon: "error",
            text: res
          })
        }
      })
    }else{
      Swal.fire({
        title:"Error",
        icon: "error",
        text: "Las contraseñas deben ser iguales"
      })
    }




  }
}