import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";
import { diagonalMove } from "./mouvements/diagonalmove";
import { upDownLeftRight } from "./mouvements/updownleftright";

export class Queen extends Piece{
    color: string;
    logo: any;

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/queen.png`;
           
    }

    getColor(): string{
        return this.color
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }

    possibleMoves(board:Square[][]):number[][]{
        let possiblemoves:number[][]=upDownLeftRight(board,this.color,this.curPosition)
        possiblemoves=possiblemoves.concat(diagonalMove(board,this.color,this.curPosition))
        return possiblemoves
        
    }

    
}