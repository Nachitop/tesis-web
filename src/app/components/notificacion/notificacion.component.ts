import { Component, OnInit} from '@angular/core';
import { Notificacion } from 'src/app/models/Notificacion';
import { Router } from '@angular/router';
import { AreaService } from 'src/app/services/area.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Usuario } from 'src/app/models/Usuario';
import {formatDate} from '@angular/common';



@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  notificaciones:Notificacion[]=[];
  user:Usuario;
  notificacion={
    usuario:'',
    fecha:''
  };
  areas:any[]= [];
  constructor(public router:Router, public areaService:AreaService, public notificacionService:NotificacionService) { 
    this.user= JSON.parse(localStorage.getItem("user"));
    this.notificaciones= JSON.parse(localStorage.getItem("notificaciones"));

    this.areaService.obtenerAreas().subscribe((res)=>{
      this.areas= res as any[];
 
      this.notificaciones.sort(function(a,b){
        return  b.confidence - a.confidence
      });
   
      this.notificaciones.forEach((notificacion,index,self)=>{
       
        let i=this.areas.findIndex((area)=>area.nombre===notificacion.lhs[0]);
      
        if(i==-1){
          self.splice(index,1);
         
        }
    

      });

      
     
    });
    

  
  }

  ngOnInit() {

  }

  aceptar(){
   
    this.notificacion.usuario=this.user._id;
    this.notificacion.fecha=formatDate(new Date(),'yyyy-MM-dd','en');
    this.notificacionService.createNotificacionStatus(this.notificacion).subscribe((res)=>{
      localStorage.removeItem("notificaciones");
      window.location.reload();
      this.router.navigateByUrl("/");
    });
  
  }



}
