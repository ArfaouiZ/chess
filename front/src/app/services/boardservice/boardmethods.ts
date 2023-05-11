import { Bishop } from "src/models/pieces/bishop";
import { King } from "src/models/pieces/king";
import { Knight } from "src/models/pieces/knight";
import { Pawn } from "src/models/pieces/pawn";
import { Queen } from "src/models/pieces/queen";
import { Rook } from "src/models/pieces/rook";
import { Square } from "src/models/square/Square";

function createBoard(board:Square[][]) {
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        board[i][j] = new Square();
      }
    }

    for(let j=0;j<8;j++){
      board[1][j] =new Square(new Pawn("black",[1,j]));}
    
      for(let j=0;j<8;j++){
        board[6][j] =new Square(new Pawn("white",[6,j]));}
      
      board[0][0]=new Square(new Rook("black",[0,0])) ;
      board[0][1]=new Square(new Knight("black",[0,1])) ;
      board[0][2]=new Square(new Bishop("black",[0,2])) ; ;
      board[0][3]=new Square(new Queen("black",[0,3])) ;
      board[0][4]=new Square(new King("black",[0,4])) ;
      board[0][5]=new Square(new Bishop("black",[0,5])) ;
      board[0][6]=new Square(new Knight("black",[0,6])) ;
      board[0][7]=new Square(new Rook("black",[0,7])) ;

      board[7][0]=new Square(new Rook("white",[7,0])) ;
      board[7][1]=new Square(new Knight("white",[7,1])) ;
      board[7][2]=new Square(new Bishop("white",[7,2])) ;
      board[7][3]=new Square(new Queen("white",[7,3])) ;
      board[7][4]=new Square(new King("white",[7,4])) ;
      board[7][5]=new Square(new Bishop("white",[7,5])) ;
      board[7][6]=new Square(new Knight("white",[7,6])) ;
      board[7][7]=new Square(new Rook("white",[7,7])) ;
      
  }

function showPossibleMoves(possiblemoves:number[][],board:Square[][]):void{
    
    
    //console.log("show possible moves",possiblemoves)
    for(let move of possiblemoves){
      let [a,b]=move
      if(board[a][b].getPiece())
        board[a][b].inCapture=true
      else
        board[a][b].possibleMove=true
  }
  }

function cleanUp(possiblemoves:number[][],board:Square[][]):void{
    
    //console.log("claen possible moves",possiblemoves)
    for(let move of possiblemoves){
      let [a,b]=move
      if(board[a][b].getPiece())
        board[a][b].inCapture=false
      else
        board[a][b].possibleMove=false
  }
  }

export {createBoard,showPossibleMoves,cleanUp}