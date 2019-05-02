import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Problema } from 'src/app/models/Problema';
import { ProblemaService } from 'src/app/services/problema.service';
import { ProblemasComponent } from '../problemas/problemas.component';
import { DialogComponent } from '../dialog/dialog.component';
import { Solucion } from 'src/app/models/Solucion';

@Component({
  selector: 'app-eliminar-dialog',
  templateUrl: './eliminar-dialog.component.html',
  styleUrls: ['./eliminar-dialog.component.css']
})
export class EliminarDialogComponent implements OnInit {
  problema:Problema= new Problema("","","","","",false,new Date(),"",{facultad:"",tipo_problema:"",area:"",personalizada:""},[{usuario:"",fecha:""}],{fecha:"",nota:"", monto:0});
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public problemaService:ProblemaService, public dialogRef:MatDialogRef<EliminarDialogComponent>) { 
      this.problema= data.problema
  }

  ngOnInit() {
  }

  editarProblema(){
    if(this.data.accion=='habilitar'){
      this.problema.status="En proceso";
      this.problemaService.editarProblema(this.problema).subscribe((res)=>{
     
      
      },error=>{},()=> this.cerrarDialog());
    }else{
      if(this.data.accion=='eliminar'){
        this.problemaService.eliminarProblema(this.problema._id).subscribe((res)=>{
        
        },error=>{}
        ,()=> this.cerrarDialog());
      }
    }
  }

  cerrarDialog(){
    this.dialogRef.close('cerrar');

  
  }

}
