
import { Square } from "../square/Square";

export abstract class Piece {
  
  curPosition:number[];
  
  

  constructor(pos:number[]){
    this.curPosition=pos;
    
  }

  getPosition():number[]{
    return this.curPosition
  }

  abstract isValidMove(s: number[]): boolean;

  move(from: number[],to: number[],board:Square[][]): void{
    let x1=from[0],y1=from[1]
    let x2=to[0],y2=to[1]
    board[x2][y2]=board[x1][y1]
    board[x1][y1]=new Square()
    this.curPosition=[x2,y2]
  };

}
