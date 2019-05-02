import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  conexion:Conexion= new Conexion();
  url_api:String="/api/notificacion";
  constructor(public http:HttpClient) { }

  getNotificaciones(facultad:String){
    return this.http.get(this.conexion.getServer()+this.url_api+"/"+facultad);
  }
}
