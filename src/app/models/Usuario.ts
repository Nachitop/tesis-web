

export class Usuario{
    constructor(_id:string="",matricula:string="",email:string="",nombre:string="",apellido:string="",
    tipo:string="", password:string="",status:string="",fecha_registro:Date=new Date(),facultad:string=""
    ){
     

        this._id=_id;
        this.matricula=matricula;
        this.email=email;
        this.nombre=nombre;
        this.apellido=apellido;
    
        this.tipo=tipo;
        this.password=password;
        this.status=status;
        this.fecha_registro=fecha_registro;
        this.facultad=facultad;
    }

    _id:string;
    matricula:string;
    email:string;
    nombre:string;
    apellido:string;
 
    tipo:string;
    password:string;
    status:string;
    fecha_registro:Date;
    facultad:string;
    getFullName(){
        return this.nombre+" "+ this.apellido;
    }
}