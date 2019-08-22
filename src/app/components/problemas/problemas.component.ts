import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { ProblemaService } from 'src/app/services/problema.service';
import { Problema } from 'src/app/models/Problema';
import { Conexion } from 'src/app/models/Conexion';

import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.css']
})
export class ProblemasComponent implements OnInit {
  filtro:string;
  user:Usuario= new Usuario();
  problemaStatus:string;
  problemas:Problema[]=[];
  conexion:Conexion=new Conexion();
  mostrarSpinner:boolean=false;

  displayedColumns: string[] = ['imagen', 'titulo','votos','usuario','fecha','status','accion'];
  dataSource: MatTableDataSource<Problema>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(public problemaService:ProblemaService, public dialog:MatDialog) {
    this.user= JSON.parse(localStorage.getItem('user'));
    
    
   }

  ngOnInit() {
  
  }

  public statusProblemas(status:string){
    this.mostrarSpinner=true;
    this.problemas=[];

   
    this.resetearFiltro();
   this.problemaStatus=status;
   this.filtro=this.filtro+"statusWeb="+this.problemaStatus;
  this.obtenerProblemas();

 
 
   
  }

  obtenerProblemas(){

    if(this.problemas.length>0){
      this.problemas.forEach((problema)=>{
        this.filtro=this.filtro+"&"+"idP="+problema._id;
      })
    }
   
    this.problemaService.getProblemas(this.filtro).subscribe((res)=>{
      this.problemas=res as Problema[];
    
      this.iniciarTabla();
    
      this.resetearFiltro();

    },error=>{this.resetearFiltro();this.mostrarSpinner=false;},()=>this.mostrarSpinner=false);
  }

  verProblema(_id:string){
      var dialogRef=this.dialog.open(DialogComponent,{
        width:'800px',
        height:'500px',
        maxHeight:'500px',
        maxWidth:'800px',
        data:{
          title:'Problema',
          _id: _id
        },
        backdropClass: '',
        hasBackdrop:true,
        disableClose:true,
      
      });
      dialogRef.afterClosed().subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        if(res2.realizar=="obtenerProblemas"){
        
          this.statusProblemas(res2.status);
        }
      });
      

      
      
  }


  iniciarTabla(){
    this.dataSource= new MatTableDataSource(this.problemas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  resetearFiltro(){
    this.filtro="?user="+this.user._id+"&";
  }



}
