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
    normalmoves():void{}
    capturemoves():void{}

    possibleMoves(board:Square[][]):number[][]{
        let color: string=this.color;
        let [x,y]=this.curPosition;
        const possiblemoves:number[][]= []
        if (color ==='black'){
           if (y+1<8 && !board[x][y+1].getPiece())   
                possiblemoves.push([x,y+1])

           if (y==1 && y+2<8 && !board[x][y+2].getPiece())
                possiblemoves.push([x,y+2])

            if(y+1<8 && x+1<8 &&board[x+1][y+1].getPiece().getColor()==="white")
                possiblemoves.push([x+1,y+1])

            if(y+1<8 && x-1<8 &&board[x-1][y+1].getPiece().getColor()==="white")
                possiblemoves.push([x-1,y+1])
        }

        else{
            if (y-1>0 && !board[x][y-1].getPiece())   
                possiblemoves.push([x,y-1])

            if (y==6 && y-2<8 && !board[x][y-2].getPiece())
                possiblemoves.push([x,y-2])

            /* if(y-1<8 && x+1<8 && board[x+1][y-1].getPiece().getColor()==="black")
                possiblemoves.push([x+1,y-1])

            if(y-1<8 && x-1<8 && board[x-1][y-1].getPiece().getColor()==="black")
                possiblemoves.push([x-1,y-1]) */
            }
        return possiblemoves

    }

    
}