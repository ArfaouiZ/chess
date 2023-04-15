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

    getColor(): string{
        return this.color
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }
    possibleMoves(board:Square[][]):number[][]{
        let color: string=this.color;
        let [x,y]=this.curPosition;
        const possiblemoves:number[][]= []
        //upper left diagonal
        let i=-1;let j=-1 
        while ( x+i>=0 && y+j>=0) {
            if (board[x+i][y+j].getPiece()==false) possiblemoves.push([x+i,y+j]) 
            else if (board[x+i][y+j].getPiece().getColor()!==color) {
                possiblemoves.push([x+i,j+y])
                break} 
            else break
            i--;j--
        }

        //lower left diagonal
        i=1;j=-1 
        while ( x+i<8 && y+j>=0) {
            if (board[x+i][y+j].getPiece()==false) possiblemoves.push([x+i,y+j]) 
            else if (board[x+i][y+j].getPiece().getColor()!==color) {
                possiblemoves.push([x+i,j+y])
                break} 
            else break
            i++;j--
        }

        //upper right diagonal
        i=-1;j=1 
        while ( x+i>=0 && y+j<8) {
            if (board[x+i][y+j].getPiece()==false) possiblemoves.push([x+i,y+j]) 
            else if (board[x+i][y+j].getPiece().getColor()!==color) {
                possiblemoves.push([x+i,j+y])
                break} 
            else break
            i--;j++
        }

        //lower right diagonal
        i=1;j=1 
        while ( x+i<8 && y+j<8) {
            if (board[x+i][y+j].getPiece()==false) possiblemoves.push([x+i,y+j]) 
            else if (board[x+i][y+j].getPiece().getColor()!==color) {
                possiblemoves.push([x+i,j+y])
                break} 
            else break
            i++;j++
        }




        return possiblemoves
    }
    

    
}