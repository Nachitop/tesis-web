import { Solucion } from './Solucion';

export class Problema {
    constructor(
        _id:string="",
        titulo:string="",
        descripcion:string="",
        usuario:string,
        imagen:string="",
        anonimo:boolean=false,
        fecha:Date=new Date(),
        status:string="",
        etiquetas:{
            facultad:"",
            tipo_problema:"",
            area:"",
            personalizada:"",
        },
        votos:[{
            usuario:"",
            fecha:"",
        }],
       // solucion:Solucion= new Solucion(),
        solucion:{
            fecha:"",
            nota:"",
            monto:0,
        }


    ){
      this._id=_id;
      this.titulo=titulo;
      this.descripcion=descripcion;
      this.usuario=usuario;
      this.imagen=imagen;
      this.anonimo=anonimo
      this.fecha=fecha;
      this.status=status;
      this.etiquetas=etiquetas;
      this.votos=votos;
      this.solucion=solucion;
    }
   
    _id:string;
    titulo:string;
    descripcion:string;
    usuario:string;
    imagen:string;
    anonimo:boolean;
    fecha:Date;
    status:string;
    etiquetas:{
        facultad:string;
        tipo_problema:string;
        area:string;
        personalizada:string;
    };
    votos:[{
        usuario:string;
        fecha:any;
    }];
   // solucion:Solucion;
    solucion:{
        fecha:string;
        nota:string;
        monto:number;
    }
}