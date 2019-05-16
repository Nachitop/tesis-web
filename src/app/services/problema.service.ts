import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class ProblemaService {
  conexion:Conexion=new Conexion();
  url_api:string="/api/problema"
  constructor(public http:HttpClient) { }

  getProblema(_id:string){
    return this.http.get(this.conexion.getServer()+this.url_api+"/"+_id)
  }

  getProblemas(filtro){
    console.log(this.conexion.getServer()+this.url_api+filtro)
    return this.http.get(this.conexion.getServer()+this.url_api+filtro);
  }

  editarProblema(problema:any){
    return this.http.put(this.conexion.getServer()+this.url_api+"/"+problema._id,problema)
  }

  eliminarProblema(_id:string){
    return this.http.delete(this.conexion.getServer()+this.url_api+"/"+_id)
  }

  solucionarProblema(problema:any){
    return this.http.post(this.conexion.getServer()+this.url_api+"/solucionar",problema);
  }

  getEstadisticas(facultad:string, fecha_desde:string, fecha_hasta:string){
    return this.http.get(this.conexion.getServer()+this.url_api+"/estadisticas/"+facultad+"/"+fecha_desde+"/"+fecha_hasta)
  }

}
