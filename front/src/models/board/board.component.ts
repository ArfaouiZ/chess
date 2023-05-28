import { Component ,OnInit,Input} from '@angular/core';
import { Square } from '../square/Square';
import { BoardService } from 'src/app/services/boardservice/board.service';
import { ChatService } from 'src/app/services/chatservice/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';




@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Square[][] = [];
  @Input() room:string=""
  @Input() side:string=""


  @Input() minutes:number=0
  seconds: number=0;
  intervalId: any;

  turn:string="white"

  finished:string=""

  ngOnInit(): void {
    this.boardservice.initGame(this.side) 
    this.chatservice.onMoveMade().subscribe((move)=>{
      console.log("move made",move)
      
      
      let gameFinished=this.boardservice.receiveMove(move)
      

      if(gameFinished==="white won"){
        this.stopCountdown() 
        this.openDialog({opponent:"white",type:"checkmate"})
      }
      else if(gameFinished==="black won"){
        this.stopCountdown() 
        this.openDialog({opponent:"black",type:"checkmate"})
      }

      else if(gameFinished==="3-fold repetition"){
        this.stopCountdown() 
        this.openDialog({opponent:"",type:"draw"})
      }
      else if(gameFinished==="stale mate"){
        this.stopCountdown() 
        this.openDialog({opponent:"",type:"stale mate"})
      }
      else this.startCountdown()

      
    })

    this.chatservice.onInGameOption().subscribe((option)=>{
      if(option.type==="resign"){
          this.stopCountdown()
          this.openDialog(option)

      }
        
      else if(option.type==="accept draw"){
        this.stopCountdown()
        this.openDialog({opponent:"",type:"draw"})
      } 
      
      else{
        this.openDialog(option)
      }

    })

    if(this.side===this.turn)
      this.startCountdown()

   
    
  }
  
  takeBack():void{
    this.boardservice.takeBack()
    console.log("take back")
      
  }

  openDialog(option:any): any{
    let dialogRef=this.dialog.open(DialogComponent,{data:option})
    dialogRef.afterClosed().subscribe(result => {
      console.log(result,"result")

      if(option.type==="offer draw" && result==="accept"){
        this.stopCountdown() 
        this.openDialog({opponent:"",type:"draw"})
        this.chatservice.inGameOption({opponent:"",type:"accept draw"},this.room)

      }
      return result
       
      
    });
  }

  sendOption(type:string):void{
    let option={opponent:this.side,type:type}
    this.chatservice.inGameOption(option,this.room)
    if (type==="resign"){
        this.openDialog(option)
        this.stopCountdown() 
    }
  }


  makeMove(i:number,j:number):void{
   
      let moveInfo:any=this.boardservice.clickPiece(i,j)
      if(Object.keys(moveInfo).length){


        
        

        this.pauseCountdown()
        
        this.turn=this.turn==="white" ? "black": "white"

        let gameFinished=moveInfo.isGameFinished

        if(gameFinished==="white won"){
          this.openDialog({opponent:"white",type:"checkmate"})
        }
        else if(gameFinished==="black won"){
          this.openDialog({opponent:"black",type:"checkmate"})
        }
  
        else if(gameFinished==="3-fold repetition"){
          this.openDialog({opponent:"",type:"draw"})
        }
        else if(gameFinished==="stale mate"){
          this.stopCountdown() 
          this.openDialog({opponent:"",type:"stale mate"})
        }
        this.chatservice.makeMove(moveInfo,this.room)

      }
    

    /* this.chatservice.makeMove({from:}) */
  }

  

  constructor(private boardservice:BoardService,private chatservice:ChatService,private dialog:MatDialog) {
    this.board=this.boardservice.getBoard()
    /* this.boardservice.initGame(this.side) */
    console.log(this.side,"side")
  }

  //timer methods

  startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.minutes === 0 && this.seconds === 0) {
        this.stopCountdown();
      } else {
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
      }
    }, 1000);
    
  }

  pauseCountdown(): void {
    clearInterval(this.intervalId);  
  }

  resumeCountdown(): void {
   
    this.startCountdown();
    
  }

  stopCountdown(): void {
    clearInterval(this.intervalId);
  }

  
    
}
