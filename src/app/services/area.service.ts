import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  conexion:Conexion= new Conexion();
  url_api:string="/api/area";
  constructor(public http:HttpClient) { }

  obtenerAreas(){
    return this.http.get(this.conexion.getServer()+this.url_api);
  }

}
