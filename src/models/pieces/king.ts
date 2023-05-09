import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";
import { UpDownLeftRightCheck, diagonalCheck } from "./mouvements/kingcheckposition";
import { upDownLeftRight } from "./mouvements/updownleftright";

export class King extends Piece{
    color: string;
    logo: string;
    name:string="king"
    hasmoved:boolean=false


    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/king.png`;
        
           
    }
    hasMoved(){
        return this.hasmoved
    }
    setMoved(){
        
        this.hasmoved=true
    }

    getName():string{
        return this.name
    }

    getColor(): string{
        return this.color
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }

    possibleMoves(board:Square[][],kingPosition:number[]):number[][]{
        let color: string=this.color;
        let [x,y]=this.curPosition;
        const possiblemoves:number[][]= []
        //normal moves
        
        for(let i=-1 ;i<2;i++){
            for(let j=-1;j<2;j++){ 
                if(this.inBoard(x+i,y+j)) {
                    if( board[x+i][y+j].getPiece()===false || board[x+i][y+j].getPiece().getColor()!==color ){
                        let z=diagonalCheck(board,color,[x+i,y+j]) || UpDownLeftRightCheck(board,color,[x+i,y+j])
                        if(!z)
                            possiblemoves.push([x+i,y+j])
                    
                    }
                    
            }
        }}
        let c=board[x][y].inCapture
        // kingside castle
        
        
        if (this.hasMoved()===false && !c && board[x][7].getPiece() && board[x][7].getPiece().getName()=="rook" && board[x][7].getPiece().hasMoved()===false){
            
            for(let j=1;j<3;j++){
            if( board[x][y+j].getPiece()===false  ){
                let z=diagonalCheck(board,color,[x,y+j]) || UpDownLeftRightCheck(board,color,[x,y+j])
                if(!z)
                    possiblemoves.push([x,y+j])
                else break}
            else break}}

        //Queenside castle
        
        
        if (this.hasMoved()===false  && !c && board[x][0].getPiece() && board[x][0].getPiece().getName()=="rook" && board[x][0].getPiece().hasMoved()===false){
            
            for(let j=1;j<3;j++){
            if( board[x][y-j].getPiece()===false  ){
                let z=diagonalCheck(board,color,[x,y-j]) || UpDownLeftRightCheck(board,color,[x,y-j])
                if(!z)
                    possiblemoves.push([x,y-j])
                else break}
            else break}}

        
        return possiblemoves}

    
}