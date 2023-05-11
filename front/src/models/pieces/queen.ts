import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";
import { diagonalMove } from "./mouvements/diagonalmove";
import { upDownLeftRight } from "./mouvements/updownleftright";

export class Queen extends Piece{
    color: string;
    logo: string;
    name:string="queen"

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/queen.png`;
           
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
        let possiblemoves:number[][]=upDownLeftRight(board,this.color,this.curPosition)
        possiblemoves=possiblemoves.concat(diagonalMove(board,this.color,this.curPosition))

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
        
    }

    
}