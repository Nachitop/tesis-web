import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  conexion:Conexion=new Conexion();
  url_api='/api/usuario/';
  constructor(public http:HttpClient) { }

  login(usuario){
    return this.http.post(this.conexion.getServer()+this.url_api+"login",usuario)
  }
}
