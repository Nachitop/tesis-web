import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Material } from './material/Material';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { ProblemasComponent } from './components/problemas/problemas.component';
import {Routes,RouterModule} from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
//import { ProblemasSolucionadosComponent } from './components/problemas-solucionados/problemas-solucionados.component';
import { LoginComponent } from './components/login/login.component';

import {HttpClientModule} from '@angular/common/http';
import { DialogComponent } from './components/dialog/dialog.component';
import { EliminarDialogComponent } from './components/eliminar-dialog/eliminar-dialog.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

const routes:Routes=[
  //{path:'',component:MainNavComponent},
  {path:'problemas',component:ProblemasComponent},
  {path:'notificaciones', component:NotificacionComponent},
  {path:'estadisticas', component:EstadisticasComponent}
  //{path:'problemas/solucionados',component:ProblemasSolucionadosComponent},
  //{path:'login',component:LoginComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ProblemasComponent,
  //  ProblemasSolucionadosComponent,
    LoginComponent,
    DialogComponent,
    EliminarDialogComponent,
    NotificacionComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes),BrowserAnimationsModule,Material, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,FlexLayoutModule,FormsModule,ReactiveFormsModule, HttpClientModule
  ],
  entryComponents:[DialogComponent,EliminarDialogComponent],
  providers: [ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
