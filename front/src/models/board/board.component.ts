import { Component, Input,OnInit } from '@angular/core';
import { Piece } from '../piece/Piece';
import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Knight } from '../pieces/knight';
import { Pawn } from '../pieces/pawn';
import { Queen } from '../pieces/queen';
import { Rook } from '../pieces/rook';
import { Square } from '../square/Square';
import { Lastmove } from '../lastmove/lastmove';
import { diagonalCheck } from '../pieces/mouvements/kingcheckposition';
import { UpDownLeftRightCheck } from '../pieces/mouvements/kingcheckposition';
import { checkLegalMoves } from '../pieces/mouvements/legalmoves';
import { ChatserviceService } from 'src/app/services/chatservice.service';




@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit  {
  board: Square[][] = [];
  savedMoves:any =[]

  @Input() player = ''

  
   

  blackKingPosition:number[]=[0,4]
  whiteKingPosition:number[]=[7,4]

  kingPosition: number[]=[]
  PM:any=[]

  turn:any="white"



  temp:any=null
  tempPossibleMoves:number[][]=[]
  f(i: any,j: any){
    console.log(i,j)
  }

  ngOnInit(): void {
    console.log("player",this.player)
    if(this.player==="white"){
      this.PM =checkLegalMoves(this.board,this.whiteKingPosition)
      this.kingPosition=[7,4]
    }
    else if(this.player==="black")
      this.kingPosition=[0,4]

    
  }

  takeBack():void{
    if(this.savedMoves.length){
      
      let lastmove=this.savedMoves.pop()
      const {from,to,capturedPiece,lastPM,whitecheck,blackcheck}=lastmove
      
      //restor moved piece position
      this.board[from[0]][from[1]]=this.board[to[0]][to[1]]
      this.board[from[0]][from[1]].piece.curPosition=[from[0],from[1]]

      //restore kings position
      let movedPiece= this.board[from[0]][from[1]].getPiece()
      let movedPieceName=movedPiece.getName()
      let movedPieceColor=movedPiece.getColor()

      if(movedPieceName==="king" && movedPieceColor==="white" ) 
          this.whiteKingPosition=[from[0],from[1]]

      else if(movedPieceName==="king" && movedPieceColor==="black" ) 
        this.blackKingPosition=[from[0],from[1]]

      //capture move
      if(capturedPiece.getPiece()){
        capturedPiece.piece.curPosition=[to[0],to[1]]
        this.board[to[0]][to[1]]=capturedPiece
        
      }
      
      //normal move
      else
        this.board[to[0]][to[1]]=new Square()
      
      //rebuild PM
      this.PM=lastPM
      
      //let blackcheck=diagonalCheck(this.board,'black',this.blackKingPosition)|| UpDownLeftRightCheck(this.board,'black',this.blackKingPosition)
        
      //let whitecheck=diagonalCheck(this.board,'white',this.whiteKingPosition)|| UpDownLeftRightCheck(this.board,'white',this.whiteKingPosition)

      let [xb,yb]=this.blackKingPosition
      this.board[xb][yb].inCapture=blackcheck

      let [xw,yw]=this.whiteKingPosition
      this.board[xw][yw].inCapture=whitecheck

      
      console.log("take back")
      
    }
    
  }

 



  showPossibleMoves(possiblemoves:number[][]):void{
    
    
    //console.log("show possible moves",possiblemoves)
    for(let move of possiblemoves){
      let [a,b]=move
      if(this.board[a][b].getPiece())
        this.board[a][b].inCapture=true
      else
        this.board[a][b].possibleMove=true
  }
  }

  cleanUp(possiblemoves:number[][]):void{
    
    //console.log("claen possible moves",possiblemoves)
    for(let move of possiblemoves){
      let [a,b]=move
      if(this.board[a][b].getPiece())
        this.board[a][b].inCapture=false
      else
        this.board[a][b].possibleMove=false
  }
  }
  

  clickPiece(i:number,j:number):void{

    
      //console.log("square",this.board[i][j])
    if (this.board[i][j].getPiece()!==false && this.temp===null){
      
      this.temp=this.board[i][j].getPiece()
      this.board[i][j].isSelected=true
      let color=this.temp.getColor()
      /* if (color==='white' )
          this.tempPossibleMoves=this.temp.possibleMoves(this.board,this.whiteKingPosition)
      else 
      this.tempPossibleMoves=this.temp.possibleMoves(this.board,this.blackKingPosition) */
      //console.log(this.PM)
      if(this.PM.length)
        this.tempPossibleMoves=this.PM[i][j]

      else this.tempPossibleMoves=[]
      //possible moves and captures
      
      
      this.showPossibleMoves(this.tempPossibleMoves)
      
    } 
    else if(this.temp!==null ){
      let [x,y]=this.temp.getPosition()
      
      if ((x!==i || y!==j)){
        

        //check if the piece moved whether it's a king
        if(this.temp  instanceof King && this.temp.getColor()==="white" ){
          this.whiteKingPosition=[i,j]
          console.log("king position",this.whiteKingPosition)

        } 
          

        if(this.temp  instanceof King && this.temp.getColor()==="black" ) 
          this.blackKingPosition=[i,j]


        //cleanup
        this.cleanUp(this.tempPossibleMoves)

        //save move
        let lastMove:any ={}
        lastMove.from=[x,y]
        lastMove.to=[i,j]
        lastMove.capturedPiece=this.board[i][j]
        lastMove.lastPM=this.PM
        lastMove.whitecheck=this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture
        lastMove.blackcheck=this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture


        this.savedMoves.push(lastMove)
        //this.savedMoves[this.savedMoves.length-1].whitecheck=this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture
        //this.savedMoves[this.savedMoves.length-1].blackcheck=this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture

        //move made
        this.temp.move([x,y],[i,j],this.board)

        //clean PM
        this.PM=[]

        let whitecheck,blackcheck

        


        blackcheck=diagonalCheck(this.board,'black',this.blackKingPosition)|| UpDownLeftRightCheck(this.board,'black',this.blackKingPosition)
          
        whitecheck=diagonalCheck(this.board,'white',this.whiteKingPosition)|| UpDownLeftRightCheck(this.board,'white',this.whiteKingPosition)

        let [xb,yb]=this.blackKingPosition
        this.board[xb][yb].inCapture=blackcheck


        let [xw,yw]=this.whiteKingPosition
        this.board[xw][yw].inCapture=whitecheck
        console.log('white in check',whitecheck, 'black in check ',blackcheck)
      
        
       
        // test
        
        /* this.PM=checkLegalMoves(this.board,this.temp.getColor()==="white" ? this.blackKingPosition : this.whiteKingPosition) */

        //send move to other player
        let check=this.player==="white" ? blackcheck: whitecheck
       
        this.chatservice.sendMove({from:[x,y],to:[i,j],check:check})

       
      
      }
       //remove possible moves and capture if clicked same piece twice
      if(x===i && y===j)
        this.cleanUp(this.tempPossibleMoves)
      this.temp=null
      this.board[i][j].isSelected=false
      this.tempPossibleMoves=[]
    }

    
  }

  

  constructor(private chatservice: ChatserviceService) {
    this.createBoard();
    /* this.PM =checkLegalMoves(this.board,this.whiteKingPosition) */
   
    this.chatservice.getMove().subscribe(move => {
      console.log(move)
      let {from,to,check}=move
      let [x,y]=from
      let [i,j]=to
      let p=this.board[x][y].getPiece()
      let color=p.getColor()

      if(p.getName()==="king"){
        console.log("king")
        if(color==="white")
          this.whiteKingPosition=[i,j]
        
        else if(color==="black")
          this.blackKingPosition=[i,j]

      }
      
      
      

      p.move([x,y],[i,j],this.board)

      //check
      let [xb,yb]=this.blackKingPosition
      let [xw,yw]=this.whiteKingPosition
      if(this.player==="white"){
        
        this.board[xw][yw].inCapture=check 
        this.board[xb][yb].inCapture=false
      }

      else if(this.player==="black"){
        
        this.board[xb][yb].inCapture=check
        this.board[xw][yw].inCapture=false

      }
      this.PM=checkLegalMoves(this.board,p.color==="white" ? this.blackKingPosition : this.whiteKingPosition)
      //this.PM=PM
    });
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
