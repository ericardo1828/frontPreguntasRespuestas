import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  register: FormGroup;

  constructor(private fb: FormBuilder
    , private usuarioService: UsuarioService
    , private router: Router
    , private toastr: ToastrService
    ) {
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
    
    const usuario: Usuario = {
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password
    }
    this.loading = true;
    this.usuarioService.saveUser(usuario).subscribe(data => {
      console.log(data);
      this.toastr.success('El usuario ' + usuario.nombreUsuario + ' fue registrado con exito', 'Usuario Registrado');
      this.router.navigate(['/inicio/login']);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error(error.error.message,'Error!');
      this.register.reset();
      
    }
    );

  }

  chekPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : {notSame: true};
  }

}
