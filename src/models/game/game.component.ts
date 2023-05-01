import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements DoCheck {

  turn:string="white"

  f(){
    if(this.turn==="white")
      this.turn="black"
    else
      this.turn="white"

    
  }
  ngDoCheck(): void {
    if(this.turn==="white")
      console.log("white")
    else
      console.log("black")
  }

 
  
}
