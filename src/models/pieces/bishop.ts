import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";

export class Bishop extends Piece{
    color: string;
    logo: any;

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/bishop.png`;
           
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }

    
}