import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";
import { upDownLeftRight } from "./mouvements/updownleftright";

export class Rook extends Piece{
    color: string;
    logo: any;

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/rook.png`;
           
    }

    getColor(): string{
        return this.color
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }

    possibleMoves(board:Square[][]):number[][]{
        
        const possiblemoves:number[][]=upDownLeftRight(board,this.color,this.curPosition)
        return possiblemoves
    }

    
}