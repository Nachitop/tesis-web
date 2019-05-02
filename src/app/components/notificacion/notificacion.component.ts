import { Component, OnInit} from '@angular/core';
import { Notificacion } from 'src/app/models/Notificacion';
import { Router } from '@angular/router';



@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  notificaciones:Notificacion[]=[];

  constructor(public router:Router) { 
    this.notificaciones= JSON.parse(localStorage.getItem("notificaciones"));
    console.log(this.notificaciones);

  
  }

  ngOnInit() {

  }

  aceptar(){
    localStorage.removeItem("notificaciones");
    window.location.reload();
    this.router.navigateByUrl("/");
  }



}
