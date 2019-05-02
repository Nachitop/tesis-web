export class Notificacion{

    constructor(lhs:string[]=[],rhs:string[]=[],confidence:number=0){
        this.lhs=lhs;
        this.rhs=lhs;
        this.confidence=confidence;
    }
    lhs:string[];
    rhs:string[];
    confidence:number;
}