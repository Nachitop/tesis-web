import { Component, OnInit } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  matriculaFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{7}-[0-9]{1}'),
  ]);

  passwordFormControl= new FormControl('',[
    Validators.required,
    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  ]);

  loginForm:FormGroup= new FormGroup({
    matricula: this.matriculaFormControl,
    password:this.passwordFormControl
  });

  usuario:Usuario= new Usuario();
  constructor(public usuarioService:UsuarioService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ingresar(){
  
    this.usuario.matricula=this.loginForm.controls['matricula'].value;
    this.usuario.password=this.loginForm.controls['password'].value;
    this.usuarioService.login(this.usuario).subscribe((res)=>{
      this.usuario=res as Usuario;
      if(this.usuario.tipo==="Director"){
        localStorage.setItem('user',JSON.stringify(this.usuario));
        window.location.reload();
      }else{
        this.dialog.open(DialogComponent,{
          width:'250px',
          height:'250px',
          data:{
            title: 'Error de permisos de usuario',
            content: 'Usted no tiene permisos para acceder a este sistema web'
          }
        });
      }
      
      
    },error=>{

      this.dialog.open(DialogComponent,{
        width:'250px',
        height:'250px',
        data:{
          title: 'Error de autenticación',
          content: error.error.error
        }
      });
    });
  }


}
