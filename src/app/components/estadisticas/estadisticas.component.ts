import { Component, OnInit } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { ProblemaService } from 'src/app/services/problema.service';

declare var Chart:any;
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  controlFecha1:FormControl= new FormControl('',[
    Validators.required
  ]);

  controlFecha2:FormControl= new FormControl('',[
    Validators.required
  ]);

  formFecha:FormGroup= new FormGroup({
    fecha1: this.controlFecha1,
    fecha2:this.controlFecha2
  });

  usuario:Usuario= new Usuario();
  estadisticas:any[]=[];

  constructor(public problemaService:ProblemaService) {
    this.usuario= JSON.parse(localStorage.getItem("user"));
   }


  ngOnInit() {


  }

  obtenerEstadisticas(){
    var fecha_desde:Date= this.formFecha.get('fecha1').value;
    var fecha_hasta:Date= this.formFecha.get('fecha2').value;
    
    this.problemaService.getEstadisticas(this.usuario.facultad, fecha_desde.toString() ,fecha_hasta.toString()).subscribe((res)=>{
        this.estadisticas = JSON.parse(JSON.stringify(res));
      
    },(error)=>{
   
    }, ()=>{
      setTimeout(()=>{
        this.crearGraficos();
      },3000)
     
    });
  }

  crearGraficos(){
 

for(let i=0; i<=this.estadisticas.length-2;i++){
  var obj= this.estadisticas[i];
  var labels=[];
  var data=[];
  var total=0;
  var graficos=['bar','pie', 'polarArea'];
  obj.estadisticas.forEach(est => {
     labels.push(est._id);
     data.push(est.suma);
     total+=est.suma;
  });

  var ctx = document.getElementById(obj.nombre);
  var myChart = new Chart(ctx, {
  type: graficos[Math.floor(Math.random()* graficos.length)],
  data: {
      labels: labels,
      datasets: [{
          label: 'Cantidad',
          data: data,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
    responsive:true,
    title:{
      display:true,
      text: [obj.nombre,'(Número total de registros '+ total+")"],
      fontSize:20,
      lineHeight:4
    },
 
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});
}

  
    }
  

}
