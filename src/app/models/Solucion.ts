export class Solucion{
    constructor(nota:string="",monto:number=0,fecha:Date= new Date()){
        this.nota=nota;
        this.monto=monto;
        this.fecha=fecha;
    }

    nota:string;
    monto:number;
    fecha:Date;
}