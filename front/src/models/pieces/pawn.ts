import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";

export class Pawn extends Piece{
    color: string;
    logo: string;
    name:string="pawn"

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/pawn.png`;
           
    }
    

    getName():string{
        return this.name
    }

    getColor(): string {
        return this.color
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }
    
    possibleMoves(board:Square[][],kingPosition:number[],savedMoves:any[]):number[][]{
        let color: string=this.color;
        let [x,y]=this.curPosition;
        const possiblemoves:number[][]= []
        if (color ==='black'){
            //one square move
            if (this.inBoard(x+1,y) && !board[x+1][y].getPiece())   
            {possiblemoves.push([x+1,y])
            
            //two square move
            if (x==1  && !board[x+2][y].getPiece()&& !board[x+1][y].getPiece())
            possiblemoves.push([x+2,y])}
            
            //lower right diagonal capture
            if(this.inBoard(x+1,y+1) && board[x+1][y+1].getPiece() && board[x+1][y+1].getPiece().getColor()==="white" ) 
            possiblemoves.push([x+1,y+1])
            
            //lower left diagonal capture
            if(this.inBoard(x+1,y-1) && board[x+1][y-1].getPiece() && board[x+1][y-1].getPiece().getColor()==="white" )
            possiblemoves.push([x+1,y-1]) 

            //enPassant
            if (this.curPosition[0]===4 && savedMoves.length){
                let{from,to,capturedPiece,lastPM,whitecheck,blackcheck}=savedMoves[savedMoves.length-1]
                if (Math.abs(from[0]-to[0])===2 && Math.abs(from[1]-this.curPosition[1])===1 && board[to[0]][to[1]].getPiece().getName()==="pawn" && board[to[0]][to[1]].getPiece().getColor()==='white')
                    possiblemoves.push([to[0]+1,from[1]])
                }

            }

        else{

            //one square move
            if (this.inBoard(x-1,y) && !board[x-1][y].getPiece())   
                possiblemoves.push([x-1,y])
            
            //two square move
            if (x==6  && !board[x-2][y].getPiece()&& !board[x-1][y].getPiece())
                possiblemoves.push([x-2,y])
            
            //upper right diagonal capture
            if(this.inBoard(x-1,y+1) && board[x-1][y+1].getPiece() && board[x-1][y+1].getPiece().getColor()==="black" ) 
                possiblemoves.push([x-1,y+1])

            //upper left diagonal capture
            if(this.inBoard(x-1,y-1) && board[x-1][y-1].getPiece() && board[x-1][y-1].getPiece().getColor()==="black" )
                possiblemoves.push([x-1,y-1]) 
            //enPassant 
            if (this.curPosition[0]===3 && savedMoves.length){
            let{from,to,capturedPiece,lastPM,whitecheck,blackcheck}=savedMoves[savedMoves.length-1]
            if (Math.abs(from[0]-to[0])===2 && Math.abs(from[1]-this.curPosition[1])===1 && board[to[0]][to[1]].getPiece().getName()==="pawn" && board[to[0]][to[1]].getPiece().getColor()==='black')
                possiblemoves.push([to[0]-1,from[1]])
            }}

        let possibleCheck=this.isPinned(board,kingPosition,this.color)
        let xk=kingPosition[0]
        let yk=kingPosition[1]


        

        if (possibleCheck) {
            let tpx=possibleCheck.at[0]
            let tpy=possibleCheck.at[1]

            
            let p=[]
            
            for( let [mx,my] of possiblemoves) {
                if (this.inLine(xk,yk,tpx,tpy,mx,my))
                     p.push([mx,my])}
            return p
        }
        
        return possiblemoves

    }}

    
