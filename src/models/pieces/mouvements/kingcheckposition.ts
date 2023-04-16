import { Square } from "src/models/square/Square";
import { Queen } from "../queen";
import { Bishop } from "../bishop";
import { Rook } from "../rook";

function diagonalCheck (board:Square[][],color:string,kingPos:number[]):boolean{
     //upper left diagonal
     let[x,y]=kingPos
     let i=-1;let j=-1 
     while ( x+i>=0 && y+j>=0) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Bishop) 
                     return true 
            else break} }
        i--;j--
     }
 
     //lower left diagonal
     i=1;j=-1 
     while ( x+i>=0 && y+j>=0) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Bishop) 
                     return true 
            else break} }
        i++;j--
     }
 
     //upper right diagonal
     i=-1;j=1 
     while ( x+i>=0 && y+j>=0) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Bishop) 
                     return true 
            else break} }
        i--;j++
     }
 
     //lower right diagonal
     i=1;j=1 
     while ( x+i>=0 && y+j>=0) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Bishop) 
                     return true 
            else break} }
        i++;j++
     }
     return false 
    
}
function UpDownLeftRightCheck (board:Square[][],color:string,kingPos:number[]):boolean{
    let[x,y]=kingPos
    
    //right
    let i=0,j=1 
    while (  y+j<8) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Rook) 
                     return true 
            else break} }
        j++
     }
    //left
    i=0,j=-1
    while (  y+j>=0) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Rook) 
                     return true 
            else break} }
        j--
     }
    //up
    i=-1,j=0 
    while ( x+i>=0) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Rook) 
                     return true 
            else break} }
        i--
     }
    //down
    i=1,j=0 
    while ( x+i<8) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Rook) 
                     return true 
            else break} }
        i++
     }



    return false }