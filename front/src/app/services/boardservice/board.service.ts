import { Injectable } from '@angular/core';

import { UpDownLeftRightCheck, diagonalCheck } from 'src/models/pieces/mouvements/kingcheckposition';
import { checkLegalMoves } from 'src/models/pieces/mouvements/legalmoves';

import { Square } from 'src/models/square/Square';
import { cleanUp, createBoard, showPossibleMoves } from './boardmethods';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: Square[][] = [];
  savedMoves:any =[]
  PM:any=[]

  temp:any=null
  tempPossibleMoves:number[][]=[]


  blackKingPosition:number[]=[0,4]
  whiteKingPosition:number[]=[7,4]

  constructor() { 
    createBoard(this.board)
    this.PM =checkLegalMoves(this.board,this.whiteKingPosition,this.savedMoves)
    console.log('First PM',this.PM)
  }

  getBoard():Square[][]{
    return this.board
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

      console.log(movedPieceName,"name",movedPieceColor,"color")

      if(movedPieceName==="king" && movedPieceColor==="white" ){
          this.whiteKingPosition=[from[0],from[1]]
          console.log("king position",this.whiteKingPosition)

      }

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

      let [xw,yw]=this.whiteKingPosition ;
      this.board[xw][yw].inCapture=whitecheck

      
      console.log("take back")
      
    }
  }

  

  clickPiece(i:number,j:number):void{

    if (this.board[i][j].getPiece()!==false && this.temp===null){
      
      this.temp=this.board[i][j].getPiece()
      this.board[i][j].isSelected=true
      this.tempPossibleMoves=this.PM[i][j]

      
      //possible moves and captures
      showPossibleMoves(this.tempPossibleMoves,this.board)
      
    } 
    else if(this.temp!==null ){
      let [x,y]=this.temp.getPosition()
      
      if ((x!==i || y!==j)){
        //cleanup
        cleanUp(this.tempPossibleMoves,this.board)

        //save move
        this.savedMoves.push({from:[x,y],to:[i,j],capturedPiece:this.board[i][j],lastPM:this.PM})
        this.savedMoves[this.savedMoves.length-1].whitecheck=this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture
        this.savedMoves[this.savedMoves.length-1].blackcheck=this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture
        //handle en passant 
        if (this.temp.getName()==="pawn" && Math.abs(j-y)===1 && !this.board[i][j].getPiece())
            this.board[x][j]=new Square()
            
        //move made
        this.temp.move([x,y],[i,j],this.board)


        //handle castle 
        if (this.temp.getName()==="rook")
                 this.board[i][j].getPiece().setMoved()
        else if (this.temp.getName()==="king" )
              if(j-y==2) {
                 this.board[x][7].getPiece().setMoved()
                 this.board[x][7].getPiece().move([x,7],[x,5],this.board)}
              else if (y-j==2){
                 this.board[x][0].getPiece().setMoved() 
                 this.board[x][0].getPiece().move([x,0],[x,3],this.board)}
        
        //lezem saved moved tetbadel 
          
        
        //check if the piece moved whether it's a king
        if(this.temp.getName()=="king" && this.temp.getColor()==="white" ) {
          this.whiteKingPosition=[i,j]
          this.board[i][j].getPiece().setMoved()
          }

        if(this.temp.getName()=="king" && this.temp.getColor()==="black" ) {
          this.blackKingPosition=[i,j]
          this.board[i][j].getPiece().setMoved()
          }


        
        let blackcheck=diagonalCheck(this.board,'black',this.blackKingPosition)|| UpDownLeftRightCheck(this.board,'black',this.blackKingPosition)
        
        let whitecheck=diagonalCheck(this.board,'white',this.whiteKingPosition)|| UpDownLeftRightCheck(this.board,'white',this.whiteKingPosition)

        let [xb,yb]=this.blackKingPosition
        this.board[xb][yb].inCapture=blackcheck
        
        

        let [xw,yw]=this.whiteKingPosition
        this.board[xw][yw].inCapture=whitecheck
        
        
        
        // test
        let kpp=this.temp.getColor()==="white" ? this.blackKingPosition : this.whiteKingPosition
        this.PM=checkLegalMoves(this.board,kpp,this.savedMoves)
        
      }
       //remove possible moves and capture if clicked same piece twice
      if(x===i && y===j)
        cleanUp(this.tempPossibleMoves,this.board)
      this.temp=null
      this.board[i][j].isSelected=false
      this.tempPossibleMoves=[]

    }

  }

  

}
