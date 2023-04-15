import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";
import { diagonalMove } from "./mouvements/diagonalmove";


export class Bishop extends Piece{
    color: string;
    logo: any;

    constructor(color: string,pos: number[]){

        super(pos);
    
        this.color=color;
        this.logo= `../../assets/pieces/${color}/bishop.png`;
           
    }

    getColor(): string{
        return this.color
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }
    possibleMoves(board:Square[][]):number[][]{
       
        const possiblemoves:number[][]=diagonalMove(board,this.color,this.curPosition)
        return possiblemoves
    }
    

    
}