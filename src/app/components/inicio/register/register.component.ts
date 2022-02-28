import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  constructor(private fb: FormBuilder) {
    this.register = this.fb.group({
      usuario: ['',Validators.required],
      password: ['',[Validators.required, Validators.maxLength(4)]],
      confirmPassword: ['',[Validators.required, Validators.maxLength(4)]]
    }, { validator: this.chekPassword });
   }

  

  ngOnInit(): void {
  }

  registrarUsuario(){
    console.log(this.register);
  }

  chekPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : {notSame: true};
  }

}
