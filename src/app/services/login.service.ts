import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  myAppUrl: string;
  myApiUrl: string;
  toky: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Login';
    
  }

  login(usuario: Usuario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,usuario);
  }

  setLocalStorage(data: JSON): void{
    localStorage.setItem('token', JSON.stringify(data));
  }

  // getNombreUsuario(): string{
  //   const nom = localStorage.getItem('nombreUsuario');
  //   return  nom === null ? '' : nom;
  // }

  getTokenDecoded(): any{
    const helper = new JwtHelperService();

    this.toky = JSON.parse(localStorage.getItem('token') || '{}');

    const tok = localStorage.getItem('token');
    tok === null || tok === undefined ? '' : tok;
    const decodedToken = helper.decodeToken(JSON.parse(localStorage.getItem('token') || '{}'));
    return decodedToken
  }

  removeLocalStorage(): void{
    localStorage.removeItem('token');
  }
}
