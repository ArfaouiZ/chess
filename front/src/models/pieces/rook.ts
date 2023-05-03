import { BoardComponent } from "../board/board.component";
import { Piece } from "../piece/Piece";
import { Square } from "../square/Square";
import { upDownLeftRight } from "./mouvements/updownleftright";

export class Rook extends Piece{
    color: string;
    logo: any;
    name:string="rook"
    hasmoved:boolean=false

    constructor(color: string,pos: number[]){

        super(pos);
        this.color=color;
        this.logo= `../../assets/pieces/${color}/rook.png`;
        
           
    }
    hasMoved(){
        return this.hasmoved
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
        
        const possiblemoves:number[][]=upDownLeftRight(board,this.color,this.curPosition)

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