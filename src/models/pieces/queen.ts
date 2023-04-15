import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";

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
        let color: string=this.color;
        let [x,y]=this.curPosition;
        const possiblemoves:number[][]= []
        //right
        let i=0,j=1 
        while (  y+j<8) {
            if (board[x][y+j].getPiece()==false) possiblemoves.push([x,y+j]) 
            else if (board[x][y+j].getPiece().getColor()!==color) {
                possiblemoves.push([x,j+y])
                break} 
            else break
            j++
        }
        //left
        i=0,j=-1
        while (  y+j>=0) {
            if (board[x][y+j].getPiece()==false) possiblemoves.push([x,y+j]) 
            else if (board[x][y+j].getPiece().getColor()!==color) {
                possiblemoves.push([x,j+y])
                break} 
            else break
            j--
        }
        //up
        i=-1,j=0 
        while ( x+i>=0) {
            if (board[x+i][y].getPiece()==false) possiblemoves.push([x+i,y]) 
            else if (board[x+i][y].getPiece().getColor()!==color) {
                possiblemoves.push([x+i,y])
                break} 
            else break
            i--
        }
        //down
        i=1,j=0 
        while ( x+i<8) {
            if (board[x+i][y].getPiece()==false) possiblemoves.push([x+i,y]) 
            else if (board[x+i][y].getPiece().getColor()!==color) {
                possiblemoves.push([x+i,y])
                break} 
            else break
            i++
        }
        //upper left diagonal
        i=-1; j=-1 
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