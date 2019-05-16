import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import { ProblemaService } from 'src/app/services/problema.service';
import { Problema } from 'src/app/models/Problema';
import { Conexion } from 'src/app/models/Conexion';
import { EliminarDialogComponent } from '../eliminar-dialog/eliminar-dialog.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Solucion } from 'src/app/models/Solucion';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  conexion:Conexion= new Conexion();
  problema:Problema= new Problema("","","","","",false,new Date(),"",{facultad:"",tipo_problema:"",area:"",personalizada:""},[{usuario:"",fecha:""}],{fecha:"",nota:"", monto:0});

  controlNota:FormControl= new FormControl('',[
    Validators.required,
    Validators.maxLength(200),
  ]);
  controlMonto:FormControl= new FormControl(0,[
    Validators.required,
    Validators.min(0)
  ]);

  controlFecha:FormControl= new FormControl('',[
    Validators.required
  ]);

  formSolucion:FormGroup= new FormGroup({
      nota: this.controlNota,
      monto:this.controlMonto,
      fecha:this.controlFecha
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef:MatDialogRef<DialogComponent>, public problemaService:ProblemaService, public dialog2: MatDialog) {
  
   }

  ngOnInit() {
  
    this.afterOpen();
  

  }

    afterOpen(){
      this.dialogRef.afterOpened().subscribe(()=>{
    
        if(this.data._id){
          this.problemaService.getProblema(this.data._id).subscribe(res=>{
            this.problema= res as Problema;
          
          });
        }
        
      });

      
    }

    onClose(){
    
      this.dialogRef.close();
    }

    mostrarDialog2(accion:string){

      var title,content;
      if(accion=='habilitar'){
        title='Habilitar problema';
        content="¿Está seguro de habilitar el problema?";
      }else{
        if(accion=='eliminar'){
          title='Eliminar problema';
          content="¿Está seguro de eliminar el problema?";
        }
     
      }

      var dialogRef=this.dialog2.open(EliminarDialogComponent,{
        
        width:'250px',
        height:'250px',
        maxHeight:'250px',
        maxWidth:'250px',
        data: {
          title: title,
          cont:content,
          problema: this.problema,
          accion: accion
        },
        
        hasBackdrop:true,
        disableClose:true,
      });

      dialogRef.afterClosed().subscribe((res:string)=>{
        var accion={};
        accion['realizar']="obtenerProblemas";
        accion['status']="Pendiente";
        if(res==="cerrar"){
          this.dialogRef.close(accion);
        }
      })
    }


    solucionarProblema(){
      var accion={};
      accion['realizar']="obtenerProblemas";
      accion['status']="En proceso";
      var problema= new Problema("","","","","",false,new Date(),"",{facultad:"",tipo_problema:"",area:"",personalizada:""},[{usuario:"",fecha:""}],{fecha:"",nota:"", monto:0});
      problema._id=this.problema._id;
      problema.solucion.nota= this.formSolucion.get('nota').value;
      problema.solucion.monto=this.formSolucion.get('monto').value;
      var fecha_solucionada= this.formSolucion.get('fecha').value;
      problema.solucion.fecha= fecha_solucionada;
      console.log(fecha_solucionada);
      this.problemaService.solucionarProblema(problema).subscribe((res:string)=>{

      },error=>{},()=> this.dialogRef.close(accion));
    }


}
