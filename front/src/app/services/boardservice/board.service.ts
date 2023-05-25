import { Injectable } from '@angular/core';

import { UpDownLeftRightCheck, diagonalCheck } from 'src/models/pieces/mouvements/kingcheckposition';
import { checkLegalMoves } from 'src/models/pieces/mouvements/legalmoves';

import { Square } from 'src/models/square/Square';
import { cleanUp, createBoard, showPossibleMoves } from './boardmethods';
import { isGameFinished, threefoldrep } from 'src/models/pieces/mouvements/Endings';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: Square[][] = [];
  savedMoves:any =[]
  savedpositions:any={}
  PM:any=[]
  temp:any=null
  side:string=""
  
  
  tempPossibleMoves:number[][]=[]
  blackKingPosition:number[]=[0,4]
  whiteKingPosition:number[]=[7,4]

  constructor() { 
   /*  createBoard(this.board)
    this.PM =checkLegalMoves(this.board,this.whiteKingPosition,this.savedMoves)
    console.log('First PM',this.PM) */
    createBoard(this.board)
  }

 

  getBoard():Square[][]{
    return this.board
  }

  
  initGame(side:string):void{
    if(side==="white")
      this.PM =checkLegalMoves(this.board,this.whiteKingPosition,this.savedMoves)
    this.side=side


  }

  BoardToString():string{
    let ch=""
    for(let n=0;n<8;n++){
      for(let m=0;m<8;m++){
        let temp=this.board[n][m].getPiece()
        if (!temp) {ch+="."}
        else if(temp.getColor()==="black") { ch+=temp.getName().toUpperCase( );}
        else {ch+=temp.getName()} 

      }
      ch+="/"
      
    }
    return ch 
  }

  receiveMove(move:any):any{
    let {from,to,PM,savedMoves,blackcheck,whitecheck,blackKingPosition,whitekingPosition,isGameFinished,savedpositions}=move
    let [x,y]=from;let [bkx,bky]=blackKingPosition;let [wkx,wky]=whitekingPosition
    this.PM=PM
    this.board[x][y].getPiece().move(from,to,this.board,[],true)
    this.blackKingPosition=blackKingPosition;this.board[bkx][bky].inCapture=blackcheck
    this.whiteKingPosition=whitekingPosition;this.board[wkx][wky].inCapture=whitecheck
    this.savedMoves=savedMoves
    this.savedpositions=savedpositions

    
    return isGameFinished
    
    

  }


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
    console.log("take back done")}

  

  save(from:number[],to:number[],capturedSquare:Square,lastPM:any[],whitecheck:boolean,blackcheck:boolean,nature:number){
    let [x,y]=from
    let [i,j]=to
    this.savedMoves.push({from:[x,y],to:[i,j],capturedSquare:this.board[i][j],lastPM:this.PM})
    this.savedMoves[this.savedMoves.length-1].whitecheck=this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture
    this.savedMoves[this.savedMoves.length-1].blackcheck=this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture
    this.savedMoves[this.savedMoves.length-1].nature=nature

  }
  

  clickPiece(i:number,j:number){

    
    let movemade:boolean=false
    let moveInfo={}
    let gameFinished=""
      //console.log("square",this.board[i][j])

    //selectPiece
    if (this.board[i][j].getPiece()!==false && this.temp===null && this.PM.length ){
      movemade=false
      this.temp=this.board[i][j].getPiece()
      this.board[i][j].isSelected=this.temp.getColor()===this.side
      this.tempPossibleMoves=this.PM[i][j]
      //possible moves and captures
      showPossibleMoves(this.tempPossibleMoves,this.board)
      
    } 
    //piece selected make move
    else if(this.temp!==null ){
      let [x,y]=this.temp.getPosition()
      if ((x!==i || y!==j)){
        
       
        //save move
        this.save([x,y],[i,j],this.board[i][j],this.PM,this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture,this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture,1)
        
            
        //move made

        movemade=this.temp.move([x,y],[i,j],this.board,this.PM[x][y],false)
        //cleanup
        cleanUp(this.tempPossibleMoves,this.board)
        

        if (movemade){
          
        //handle en passant 
        if (this.temp.getName()==="pawn" && Math.abs(j-y)===1 && !this.savedMoves[this.savedMoves.length-1].capturedSquare.getPiece())
            { if (this.temp.getColor()==="white") 
              this.board[i+1][j]=new Square()
            else this.board[i-1][j]=new Square() }


        //handle castle 
        if (this.temp.getName()==="rook")
                 this.board[i][j].getPiece().setMoved(1)
        
        else if (this.temp.getName()==="king" ){
          if(j-y==2) {
            this.save([x,7],[x,5],this.board[x][5],this.PM,this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture,this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture,2)
            this.board[x][7].getPiece().setMoved(1)
            this.board[x][7].getPiece().move([x,7],[x,5],this.board,this.PM[x][7],true)
          }
          else if (y-j==2){
              this.save([x,0],[x,3],this.board[x][3],this.PM,this.board[this.whiteKingPosition[0]][this.whiteKingPosition[1]].inCapture,this.board[this.blackKingPosition[0]][this.blackKingPosition[1]].inCapture,2)
              this.board[x][0].getPiece().setMoved(1) 
              this.board[x][0].getPiece().move([x,0],[x,3],this.board,this.PM[x][0],true)
            }

        }
             
        
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
        let bs=this.BoardToString()
        
        if (threefoldrep(this.savedpositions,bs)) gameFinished="3-fold repetition"
        else if(isGameFinished(this.PM)) 
                {console.log("FINISHED")
                if (this.temp.getColor()==="white" && blackcheck){
                  gameFinished="white won"
                  console.log("white won")
                } 
                      
                else if (this.temp.getColor()==="black" && whitecheck)
                      gameFinished="black won"
                else
                    gameFinished="stale mate" 
              }
        

      
          moveInfo={from:[x,y],to:[i,j],PM:this.PM,savedMoves:this.savedMoves,blackcheck:blackcheck,whitecheck:whitecheck
            ,blackKingPosition:this.blackKingPosition,whitekingPosition:this.whiteKingPosition,isGameFinished:gameFinished,savedpositions:this.savedpositions}
          this.PM=[]
      }
      else if (!movemade){
        this.savedMoves.pop()
        }
      
      
      }

       //remove possible moves and capture if clicked same piece twice
      else if(x===i && y===j)
        cleanUp(this.tempPossibleMoves,this.board)
        
      
      
      this.temp=null
      this.board[i][j].isSelected=false
      this.board[x][y].isSelected=false
      this.tempPossibleMoves=[]
      

    }

    console.log(movemade,"moved made")
    
    return moveInfo
    
  }

  

}
