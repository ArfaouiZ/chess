import { Square } from "../../square/Square";

export function diagonalMove(board:Square[][],color:string,curPosition: number[]):number[][]{
    
    let [x,y]=curPosition;
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




