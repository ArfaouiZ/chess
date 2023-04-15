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
    
    possibleMoves(board:Square[][],inBoard:(x:number,y:number)=>boolean):number[][]{
        let color: string=this.color;
        let [x,y]=this.curPosition;
        const possiblemoves:number[][]= []
        if (color ==='black'){
            //one square move
            if (inBoard(x+1,y) && !board[x+1][y].getPiece())   
            {possiblemoves.push([x+1,y])
            
            //two square move
            if (x==1  && !board[x+2][y].getPiece()&& !board[x+1][y].getPiece())
            possiblemoves.push([x+2,y])}
            
            //lower right diagonal capture
            if(inBoard(x+1,y+1) && board[x+1][y+1].getPiece() && board[x+1][y+1].getPiece().getColor()==="white" ) 
            possiblemoves.push([x+1,y+1])
            
            //lower left diagonal capture
            if(inBoard(x+1,y-1) && board[x+1][y-1].getPiece() && board[x+1][y-1].getPiece().getColor()==="white" )
            possiblemoves.push([x+1,y-1]) 
        }

        else{

            //one square move
            if (inBoard(x-1,y) && !board[x-1][y].getPiece())   
                possiblemoves.push([x-1,y])
            
            //two square move
            if (x==6  && !board[x-2][y].getPiece()&& !board[x-1][y].getPiece())
                possiblemoves.push([x-2,y])
            
            //upper right diagonal capture
            if(inBoard(x-1,y+1) && board[x-1][y+1].getPiece() && board[x-1][y+1].getPiece().getColor()==="black" ) 
                possiblemoves.push([x-1,y+1])

            //upper left diagonal capture
            if(inBoard(x-1,y-1) && board[x-1][y-1].getPiece() && board[x-1][y-1].getPiece().getColor()==="black" )
                possiblemoves.push([x-1,y-1]) 
            }
        console.log("possible moves",possiblemoves)
        return possiblemoves

    }

    
}