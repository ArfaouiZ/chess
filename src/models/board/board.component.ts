import { Component } from '@angular/core';
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
import { isGameFinished } from '../pieces/mouvements/isgamefinished';




@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  board: Square[][] = [];
  savedMoves:any =[]
  blackKingPosition:number[]=[0,4]
  whiteKingPosition:number[]=[7,4]
  PM:any=[]
  temp:any=null
  tempPossibleMoves:number[][]=[]
  

  takeBack():void{
    
    if(this.savedMoves.length){
      let lastmove=this.savedMoves.pop()
      const {from,to,capturedSquare,lastPM,whitecheck,blackcheck,nature}=lastmove
      
      //restore moved piece position
      this.board[from[0]][from[1]]=this.board[to[0]][to[1]]
      this.board[from[0]][from[1]].piece.curPosition=[from[0],from[1]]

      //restore king s position
      let movedPiece= this.board[from[0]][from[1]].getPiece()
      let movedPieceName=movedPiece.getName()
      let movedPieceColor=movedPiece.getColor()
      if(movedPieceName==="rook") this.board[from[0]][from[1]].getPiece().setMoved(-1)
      if(movedPieceName==="king" && movedPieceColor==="white" ){
          this.whiteKingPosition=[from[0],from[1]]
          this.board[from[0]][from[1]].getPiece().setMoved(-1)}

      else if(movedPieceName==="king" && movedPieceColor==="black" ){
        this.blackKingPosition=[from[0],from[1]]
        this.board[from[0]][from[1]].getPiece().setMoved(-1)}
      //capture move
      if(capturedSquare.getPiece()){
        capturedSquare.piece.curPosition=[to[0],to[1]]
        this.board[to[0]][to[1]]=capturedSquare}
      //normal move
      else
        this.board[to[0]][to[1]]=new Square()
      //rebuild PM
      this.PM=lastPM
      //restore checks
      let [xb,yb]=this.blackKingPosition
      this.board[xb][yb].inCapture=blackcheck
      let [xw,yw]=this.whiteKingPosition ;
      this.board[xw][yw].inCapture=whitecheck
      //handle castle
      if(this.savedMoves.length && nature===2){
        let lastmove=this.savedMoves.pop()
        const {from,to,capturedSquare,lastPM,whitecheck,blackcheck,nature}=lastmove
        //restore moved piece position
         this.board[from[0]][from[1]]=this.board[to[0]][to[1]]
        this.board[from[0]][from[1]].piece.curPosition=[from[0],from[1]]

        //restore king s position
        let movedPiece= this.board[from[0]][from[1]].getPiece()
        let movedPieceName=movedPiece.getName()
        let movedPieceColor=movedPiece.getColor()
      
        if(movedPieceName==="rook") this.board[from[0]][from[1]].getPiece().setMoved(-1)
      

        if(movedPieceName==="king" && movedPieceColor==="white" ){
          this.whiteKingPosition=[from[0],from[1]]
          this.board[from[0]][from[1]].getPiece().setMoved(-1)}

        else if(movedPieceName==="king" && movedPieceColor==="black" ){
           this.blackKingPosition=[from[0],from[1]]
           this.board[from[0]][from[1]].getPiece().setMoved(-1)}
      //capture move
      if(capturedSquare.getPiece()){
           capturedSquare.piece.curPosition=[to[0],to[1]]
           this.board[to[0]][to[1]]=capturedSquare}
      
      //normal move
      else
        this.board[to[0]][to[1]]=new Square()
      //rebuild PM
      this.PM=lastPM
      //restore checks
      let [xb,yb]=this.blackKingPosition
      this.board[xb][yb].inCapture=blackcheck
      let [xw,yw]=this.whiteKingPosition ;
      this.board[xw][yw].inCapture=whitecheck
        
        
      }
      
    }
    console.log("take back")}
    
    
  

 



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
  save(from:number[],to:number[],capturedSquare:Square,lastPM:any[],whitecheck:boolean,blackcheck:boolean,nature:number){
    let [x,y]=from
    let [i,j]=to
    this.savedMoves.push({from:[x,y],to:[i,j],capturedSquare:this.board[i][j],lastPM:this.PM})
    this.savedMoves[this.savedMoves.length-1].whitecheck=this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture
    this.savedMoves[this.savedMoves.length-1].blackcheck=this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture
    this.savedMoves[this.savedMoves.length-1].nature=nature

  }
  

  clickPiece(i:number,j:number):void{

    
    let movemade:boolean
      //console.log("square",this.board[i][j])
    if (this.board[i][j].getPiece()!==false && this.temp===null){
      movemade=false
      this.temp=this.board[i][j].getPiece()
      this.board[i][j].isSelected=true
      let color=this.temp.getColor()
      this.tempPossibleMoves=this.PM[i][j]

      
      //possible moves and captures
      this.showPossibleMoves(this.tempPossibleMoves)
      
    } 
    else if(this.temp!==null ){
      let [x,y]=this.temp.getPosition()
      
      if ((x!==i || y!==j)){
        
        //cleanup
        this.cleanUp(this.tempPossibleMoves)
        //save move
        this.save([x,y],[i,j],this.board[i][j],this.PM,this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture,this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture,1)
        
            
        //move made
        movemade=this.temp.move([x,y],[i,j],this.board,this.PM[x][y],false)

        if (movemade){
          
        //handle en passant 
        if (this.temp.getName()==="pawn" && Math.abs(j-y)===1 && !this.savedMoves[this.savedMoves.length-1].capturedPiece.getPiece())
            { if (this.temp.getColor()==="white") this.board[i+1][j]=new Square()
              else this.board[i-1][j]=new Square() }


        //handle castle 
        if (this.temp.getName()==="rook")
                 this.board[i][j].getPiece().setMoved(1)
        else if (this.temp.getName()==="king" )
              if(j-y==2) {
                 this.save([x,7],[x,5],this.board[x][5],this.PM,this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture,this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture,2)
                 this.board[x][7].getPiece().setMoved(1)
                 this.board[x][7].getPiece().move([x,7],[x,5],this.board,this.PM[x][7],true)}
              else if (y-j==2){
                 this.save([x,0],[x,3],this.board[x][3],this.PM,this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture,this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture,2)
                 this.board[x][0].getPiece().setMoved(1) 
                 this.board[x][0].getPiece().move([x,0],[x,3],this.board,this.PM[x][0],true)}
        
        //lezem saved moved tetbadel lel en passant  
          
        
        //check if the piece moved whether it's a king
        if(this.temp.getName()=="king" && this.temp.getColor()==="white" ) {
          this.whiteKingPosition=[i,j]
          this.board[i][j].getPiece().setMoved(1)
          }

        if(this.temp.getName()=="king" && this.temp.getColor()==="black" ) {
          this.blackKingPosition=[i,j]
          this.board[i][j].getPiece().setMoved(1)
          }


        
        let blackcheck=diagonalCheck(this.board,'black',this.blackKingPosition)|| UpDownLeftRightCheck(this.board,'black',this.blackKingPosition)
        let whitecheck=diagonalCheck(this.board,'white',this.whiteKingPosition)|| UpDownLeftRightCheck(this.board,'white',this.whiteKingPosition)

        let [xb,yb]=this.blackKingPosition
        this.board[xb][yb].inCapture=blackcheck
        let [xw,yw]=this.whiteKingPosition
        this.board[xw][yw].inCapture=whitecheck
        
        
        // refill possible moves 
        let kpp=this.temp.getColor()==="white" ? this.blackKingPosition : this.whiteKingPosition
        this.PM=checkLegalMoves(this.board,kpp,this.savedMoves)
        
        

        //check if game is finished 
        
        if(isGameFinished(this.PM)) 
                {console.log("FINISHED")
                if (this.temp.getColor()==="white" && blackcheck) 
                      console.log("white won")
                else if (this.temp.getColor()==="black" && whitecheck) 
                      console.log("black won ")
                else console.log("Draw : Stalemate ")}
        

      
      }
      else if (!movemade){
        this.savedMoves.pop()
        }
      
      
      }

       //remove possible moves and capture if clicked same piece twice
      else if(x===i && y===j)
        this.cleanUp(this.tempPossibleMoves)
        
      
      
      this.temp=null
      this.board[i][j].isSelected=false
      this.board[x][y].isSelected=false
      this.tempPossibleMoves=[]
      console.log(this.savedMoves.length)

    }

    
  }

  

  constructor() {
    this.createBoard();
    this.PM =checkLegalMoves(this.board,this.whiteKingPosition,this.savedMoves)
    
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
