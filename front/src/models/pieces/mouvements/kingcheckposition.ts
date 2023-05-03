import { Square } from "src/models/square/Square";
import { Queen } from "../queen";
import { Bishop } from "../bishop";
import { Rook } from "../rook";
import { Knight } from "../knight";
import { Pawn } from "../pawn";

function inBoard(i:number,j:number): boolean{
    if(i<8 && i>-1 && j<8 &&j>-1) return true
    return false 
  }

function diagonalCheck (board:Square[][],color:string,kingPos:number[]):boolean{
     //upper left diagonal
     let[x,y]=kingPos
     
     let i=-1;let j=-1 
     while ( x+i>=0 && y+j>=0) {
        
        if (board[x+i][y+j].getPiece() ) {
            
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Bishop) 
                     {//console.log(board[x+i][y+j].getPiece(),'danger at ',x+i,y+j)
                     return true}
                else {//console.log('no threat at ' ,x+i,y+j)
                      break }
                    }
                
                    else {//console.log('no threat at ' ,x+i,y+j)
                    break }}
            
        
        i--;j--}
     
 
     //lower left diagonal
     i=1;j=-1 
     while ( x+i<8 && y+j>=0) {
        if (board[x+i][y+j].getPiece()) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Bishop) 
                {//console.log(board[x+i][y+j].getPiece(),'danger at ',x+i,y+j)
                return true}
                else {//console.log('no threat at ' ,x+i,y+j)
                break } }
                else {//console.log('no threat at ' ,x+i,y+j)
                break }} 
        i++;j--
    }
     
 
     //upper right diagonal
     i=-1;j=1 
     while ( x+i>=0 && y+j<8) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Bishop) 
                {//console.log(board[x+i][y+j].getPiece(),'danger at ',x+i,y+j)
                return true}
                else {//console.log('no threat at ' ,x+i,y+j)
                break }}
                else {//console.log('no threat at ' ,x+i,y+j)
                break }} 
        i--;j++
    
    }
     
 
     //lower right diagonal
     i=1;j=1 
     while ( x+i<8 && y+j<8) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Bishop) 
                {//console.log(board[x+i][y+j].getPiece(),'danger at ',x+i,y+j)
                return true} 
                else {//console.log('no threat at ' ,x+i,y+j)
                break }}
                else {//console.log('no threat at ' ,x+i,y+j)
                break }} 
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
                {//console.log(board[x+i][y+j].getPiece(),'danger at ',x+i,y+j)
                return true} 
                else {//console.log('no threat at ' ,x+i,y+j)
                break }}
                else {//console.log('no threat at ' ,x+i,y+j)
                break }} 
        j++
     }
    //left
    i=0,j=-1
    while (  y+j>=0) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Rook) 
                {//console.log(board[x+i][y+j].getPiece(),'danger at ',x+i,y+j)
                return true} 
                else {//console.log('no threat at ' ,x+i,y+j)
                break }}
                else {//console.log('no threat at ' ,x+i,y+j)
                break }} 
        j--
     }
    //up
    i=-1,j=0 
    while ( x+i>=0) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Rook) 
                {//console.log(board[x+i][y+j].getPiece(),'danger at ',x+i,y+j)
                return true} 
                else {//console.log('no threat at ' ,x+i,y+j)
                break }}
                else {//console.log('no threat at ' ,x+i,y+j)
                break }} 
        i--
     }
    //down
    i=1,j=0 
    while ( x+i<8) {
        if (board[x+i][y+j].getPiece() ) {
            if(board[x+i][y+j].getPiece().getColor()!==color) {
                if (board[x+i][y+j].getPiece() instanceof Queen || board[x+i][y+j].getPiece() instanceof Rook) 
                {//console.log(board[x+i][y+j].getPiece(),'danger at ',x+i,y+j)
                return true} 
                else {//console.log('no threat at ' ,x+i,y+j)
                break }}
                else {//console.log('no threat at ' ,x+i,y+j)
                break }} 
        i++
     }
    
    //Pawn check
    if (color=="white") {
        if (inBoard(x-1,y+1) && board[x-1][y+1].getPiece() &&  board[x-1][y+1].getPiece().getColor()=="black" && board[x-1][y+1].getPiece() instanceof Pawn) 
            {//console.log(board[x-1][y+1].getPiece(),"danger at ",x-1,y+1)
            return true }
        if (inBoard(x-1,y-1) && board[x-1][y-1].getPiece() &&  board[x-1][y-1].getPiece().getColor()=="black" && board[x-1][y-1].getPiece() instanceof Pawn) 
            {//console.log(board[x-1][y-1].getPiece(),"danger at ",x-1,y-1)
            return true } 
        }
    else {
        if (inBoard(x+1,y+1) && board[x+1][y+1].getPiece() &&  board[x+1][y+1].getPiece().getColor()=="white" && board[x+1][y+1].getPiece() instanceof Pawn) 
            {//console.log(board[x+1][y+1].getPiece(),"danger at ",x+1,y+1)
            return true } 
        if (inBoard(x+1,y-1) && board[x+1][y-1].getPiece() &&  board[x+1][y-1].getPiece().getColor()=="white" && board[x+1][y-1].getPiece() instanceof Pawn) 
            {//console.log(board[x+1][y-1].getPiece(),"danger at ",x+1,y-1)
            return true } 
    }

          

    //knight check 
    let l=[-2,-1,1,2]
    for (let k of l){
        let [p1,p2]=[[x+k,y+3-Math.abs(k)],[x+k,y-3+Math.abs(k)]]
        
            
        if(inBoard(p1[0],p1[1]) &&  board[p1[0]][p1[1]].getPiece() && board[p1[0]][p1[1]].getPiece().getColor()!==color && board[p1[0]][p1[1]].getPiece() instanceof Knight)
            return true
        if(inBoard(p2[0],p2[1]) &&  board[p2[0]][p2[1]].getPiece() && board[p2[0]][p2[1]].getPiece().getColor()!==color && board[p2[0]][p2[1]].getPiece() instanceof Knight )
            return true
        
        }
 



    return false }
    export {UpDownLeftRightCheck,diagonalCheck}