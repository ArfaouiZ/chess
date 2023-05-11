import { Component } from '@angular/core';
import { Square } from '../square/Square';
import { BoardService } from 'src/app/services/boardservice/board.service';




@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  board: Square[][] = [];
  
  takeBack():void{
    this.boardservice.takeBack()
    console.log("take back")
      
  }

 

  makeMove(i:number,j:number):void{
    this.boardservice.clickPiece(i,j)
  }

  

  constructor(private boardservice:BoardService) {
    this.board=this.boardservice.getBoard()
  }

  
    
}
