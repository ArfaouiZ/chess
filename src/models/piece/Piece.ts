
import { Square } from "../square/Square";

export abstract class Piece {
  
  curPosition:number[];
  

  constructor(pos:number[]){
    this.curPosition=pos;
    
  }

  abstract isValidMove(s: number[]): boolean;

  move(s:number[]): void{
    
  };

}
