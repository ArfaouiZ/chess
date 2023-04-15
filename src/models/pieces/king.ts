import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";

export class King extends Piece{
    color: string;
    logo: any;

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/king.png`;
           
    }

    getColor(): string{
        return this.color
    }

    isValidMove(s: number[]): boolean {
        
        return false;
    }

    possibleMoves(board:Square[][],inBoard:(x:number,y:number)=>boolean):number[][]{
        let color: string=this.color;
        let [x,y]=this.curPosition;
        const possiblemoves:number[][]= []
        for(let i=-1 ;i<2;i++){
            for(let j=-1;j<2;j++){ 
                if(inBoard(x+i,y+j)) {
                    if( board[x+i][y+j].getPiece()===false)
                        possiblemoves.push([x+i,y+j])
                    else if ( board[x+i][y+j].getPiece().getColor()!==color)
                        possiblemoves.push([x+i,y+j])
            }
        }
        
        
    }return possiblemoves}

    
}