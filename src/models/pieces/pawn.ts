import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";

export class Pawn extends Piece{
    color: string;
    logo: any;

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/pawn.png`;
           
    }

    getColor(): string {
        return this.color
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }

    showPossibleMoves(from: number):void{
        let color: string=this.getColor();
        switch(from){

        }

    }

    
}