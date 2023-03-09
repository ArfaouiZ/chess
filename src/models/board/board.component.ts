import { Component } from '@angular/core';
import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Knight } from '../pieces/knight';
import { Pawn } from '../pieces/pawn';
import { Queen } from '../pieces/queen';
import { Rook } from '../pieces/rook';
import { Square } from '../square/Square';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  board: Square[][] = [];

  temp:any=null
  f(i: any,j: any){
    console.log(i,j)
  }

  g(i: any,j:any):void{
    
    
    if(this.board[i][j].piece===false && this.temp===null)
      console.log("empty square at ",i,j)

    else if (this.board[i][j].piece!==false && this.temp===null){
      this.temp=this.board[i][j]
      
      
      
    }
    

    else if(this.temp!==null ){
      let [x,y]=this.temp.piece.getPosition()
      
      if (x!==i || y!==j){
        
        this.temp.piece.move([x,y],[i,j],this.board)
        console.log("move made"," from ",x,y,"to : ",i,j)
      }
      this.temp=null
    }

    
  }

  constructor() {
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < 8; i++) {
      this.board[i] = [];
      for (let j = 0; j < 8; j++) {
        this.board[i][j] = new Square();
      }
    }

    for(let j=0;j<8;j++){
      this.board[1][j] =new Square(new Pawn("black",[1,j]));}
    
      for(let j=0;j<8;j++){
        this.board[6][j] =new Square(new Pawn("white",[6,j]));}
      
      this.board[0][0]=new Square(new Rook("black",[0,0])) ;
      this.board[0][1]=new Square(new Knight("black",[0,1])) ;
      this.board[0][2]=new Square(new Bishop("black",[0,2])) ; ;
      this.board[0][3]=new Square(new Queen("black",[0,3])) ;
      this.board[0][4]=new Square(new King("black",[0,4])) ;
      this.board[0][5]=new Square(new Bishop("black",[0,5])) ;
      this.board[0][6]=new Square(new Knight("black",[0,6])) ;
      this.board[0][7]=new Square(new Rook("black",[0,7])) ;

      this.board[7][0]=new Square(new Rook("white",[7,0])) ;
      this.board[7][1]=new Square(new Knight("white",[7,1])) ;
      this.board[7][2]=new Square(new Bishop("white",[7,2])) ;
      this.board[7][3]=new Square(new Queen("white",[7,3])) ;
      this.board[7][4]=new Square(new King("white",[7,4])) ;
      this.board[7][5]=new Square(new Bishop("white",[7,5])) ;
      this.board[7][6]=new Square(new Knight("white",[7,6])) ;
      this.board[7][7]=new Square(new Rook("white",[7,7])) ;
      
      
  }
}
