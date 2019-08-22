import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/Usuario';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Notificacion } from 'src/app/models/Notificacion';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  user:Usuario;
  notificaciones:Notificacion[]=[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public notificacion:NotificacionService, public router:Router) {
    this.user= JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    if(this.user!=null && this.user!=undefined){
      this.obtenerNotificaciones();
    }

    if(localStorage.getItem("notificaciones")!=null){
      this.notificaciones=JSON.parse(localStorage.getItem("notificaciones"));
    }
   
  } 

  irANotificaciones(){
    
    if(localStorage.getItem("notificaciones")!=null){
    
      this.router.navigateByUrl('notificaciones');
    }
  }

  obtenerNotificaciones(){
    setInterval(()=>{
      //localStorage.removeItem("notificaciones");
    
      this.notificacion.getNotificacionStatus(this.user._id, formatDate(new Date(),'yyyy-MM-dd','en')).subscribe((res)=>{
        
        this.notificacion.getNotificaciones(this.user.facultad).subscribe((res)=>{
        localStorage.setItem("notificaciones",JSON.stringify(res));
        this.notificaciones=JSON.parse(localStorage.getItem("notificaciones"));
     
      },(error)=>{
     
      },()=>{

      });
        
      },error=>{
        localStorage.removeItem("notificaciones");
      });
    
    },500000);
  }


  salir(){
    localStorage.clear();
    window.location.reload();
  }

}
