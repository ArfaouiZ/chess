import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";

export class Knight extends Piece{
    color: string;
    logo: string;
    name:string="knight"

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/knight.png`;
           
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

        let l=[-2,-1,1,2]
        for (let k of l){
            let [p1,p2]=[[x+k,y+3-Math.abs(k)],[x+k,y-3+Math.abs(k)]]
            if(this.inBoard(p1[0],p1[1]) &&  board[p1[0]][p1[1]].getPiece()===false)
                possiblemoves.push(p1)
            else if(this.inBoard(p1[0],p1[1]) &&  board[p1[0]][p1[1]].getPiece() && board[p1[0]][p1[1]].getPiece().getColor()!==color)
                possiblemoves.push(p1)

            if(this.inBoard(p2[0],p2[1]) &&  board[p2[0]][p2[1]].getPiece()===false)
                possiblemoves.push(p2)
            else if(this.inBoard(p2[0],p2[1]) &&  board[p2[0]][p2[1]].getPiece() && board[p2[0]][p2[1]].getPiece().getColor()!==color)
                possiblemoves.push(p2)
            
            
          }
        let possibleCheck=this.isPinned(board,kingPosition,this.color)
        if (possibleCheck) return []
        
       
        return possiblemoves
    }

    
}