import { Piece } from "../piece/Piece"
import { Bishop } from "../pieces/bishop"
import { King } from "../pieces/king"
import { Knight } from "../pieces/knight"
import { Pawn } from "../pieces/pawn"
import { Queen } from "../pieces/queen"
import { Rook } from "../pieces/rook"

export class Square{

    piece:any
    inCapture:boolean=false
    possibleMove:boolean=false
    isSelected :boolean=false
     
    
    constructor(piece? :Piece){
        if(piece)
            this.piece=piece
        else
            this.piece=false
    }

    getPiece():any{
        return this.piece
    }
}