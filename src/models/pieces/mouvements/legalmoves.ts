import { Square } from "src/models/square/Square";
import { Queen } from "../queen";
import { Rook } from "../rook";
import { Bishop } from "../bishop";
import { Knight } from "../knight";
import { Pawn } from "../pawn";
import { King } from "../king";
import { UpDownLeftRightCheck, diagonalCheck } from "./kingcheckposition";

function checkLegalMoves(board :Square[][],kingPosition:number[],savedMoves:any[]):any{
    //console.log(board)
    let [xk,yk]=kingPosition
    //console.log(xk,yk)
    //console.log(board[7][4])
    let kingInCheck=board[xk][yk].inCapture
    let king=board[xk][yk].getPiece()
    let color=king.getColor()
    

    let legalMoves:any =[]
    let l:any
    for(let i=0;i<8;i++){
         
        l=[]
        for(let j=0;j<8;j++){
            if(board[i][j].getPiece() && board[i][j].getPiece().getColor()===color){

                let possibleMoves=board[i][j].getPiece().possibleMoves(board,kingPosition,savedMoves)
                
                if (kingInCheck){
                    let p=[]
                    for(let move of possibleMoves){
                        if(!escapeCheck(board,[i,j],move,color,kingPosition)) 
                            p.push(move)

                     }
                    
                    l.push(p)
                }

                else
                    l.push(possibleMoves)

            }

            else l.push([])


        }
        legalMoves.push(l)
    }
    
    return legalMoves
 }


function escapeCheck(board: Square[][],from: number[],to: number[],color:string,kingPosition:number[]): boolean{
    
    
    let tempBoard=copyBoard(board)
    let [x,y]=from
    tempBoard[x][y].getPiece().move(from,to,tempBoard)
    

    if (tempBoard[to[0]][to[1]].getPiece().getName()==='king') kingPosition=[to[0],to[1]]

    return diagonalCheck(tempBoard,color,kingPosition) || UpDownLeftRightCheck(tempBoard,color,kingPosition) 


}


function copyBoard(board: Square[][]):any{
    let newBoard: Square[][] =[]
    for (let i = 0; i < 8; i++) {
        newBoard[i] = [];
        for (let j = 0; j < 8; j++) {
          newBoard[i][j] = new Square();
        }
      }

    for(let i=0;i<8;i++)
        for(let j=0;j<8;j++){
            if(board[i][j].getPiece()){
                let p=board[i][j].getPiece()
                let color=p.getColor()
                let x=p.getPosition()[0]
                let y=p.getPosition()[1]
                let name=p.getName()
                switch (name) {
                    case "queen":
                        newBoard[i][j]=new Square(new Queen(color,[x,y]))
                        break;
                    case "rook":
                        newBoard[i][j]=new Square(new Rook(color,[x,y]))
                        break;
                    case "bishop":
                        newBoard[i][j]=new Square(new Bishop(color,[x,y]))
                        break;
                    case "knight":
                        newBoard[i][j]=new Square(new Knight(color,[x,y]))
                        break;
                    case "pawn":
                        newBoard[i][j]=new Square(new Pawn(color,[x,y]))
                        break;
                    case "king":
                        newBoard[i][j]=new Square(new King(color,[x,y]))
                        break;

                    default:
                        break;
                }
            }

            else
                newBoard[i][j]=new Square()

        }

        return newBoard


}

export{checkLegalMoves}