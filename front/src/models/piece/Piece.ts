
import { UpDownLeftRightCheck, diagonalCheck } from "../pieces/mouvements/kingcheckposition";
import { Rook } from "../pieces/rook";
import { Square } from "../square/Square";

export abstract class Piece {
  
  curPosition:number[];
  
  
  

  constructor(pos:number[]){
    this.curPosition=pos;
    
    
  }

  getPosition():number[]{
    return this.curPosition
  }

  setPosition(pos:number[]){
    this.curPosition=pos
  }
   

  abstract isValidMove(s: number[]): boolean;
  inBoard(i:number,j:number): boolean{
    if(i<8 && i>-1 && j<8 &&j>-1) return true
    return false 
  }
  inLine(xk:number,yk:number,tpx:number,tpy:number,mx:number,my:number){

    if(yk===tpy && my===yk){
      let maxx =Math.max(xk,tpx)
      let minx =Math.min(xk,tpx)
      if (mx>=minx && mx<=maxx) return true


    }

    else if(xk===tpx && mx===xk){
      let maxy =Math.max(yk,tpy)
      let miny =Math.min(yk,tpy)
      if (my>=miny && my<=maxy) return true 

    } 
    
      let a=(xk-tpx)/(yk-tpy)
      let b=yk-xk*a
      let maxx =Math.max(xk,tpx)
      let minx =Math.min(xk,tpx)
      let maxy =Math.max(yk,tpy)
      let miny =Math.min(yk,tpy)
      if (mx*a+b==my && mx>=minx && mx<=maxx && my<=maxy && my>=miny) return true

    
    
    return false 
}

  isPinned(board: Square[][],kingPosition: number[],color:string):any{
    //position of piece to move
    let [x,y]=this.curPosition

    //current player's king position
    let xk=kingPosition[0]
    let yk=kingPosition[1]

    //check direction
    let xinc,yinc

    //vertical direction
    if (x===xk){
      xinc=0
      yinc=(y-yk)/Math.abs(y-yk)
    } 
    //horizental direction 
     else if (y===yk){
      xinc=(x-xk)/Math.abs(x-xk)
      yinc=0
      
    } 

    //diagonal direction
     else{
      xinc=(x-xk)/Math.abs(x-xk)
      yinc=(y-yk)/Math.abs(y-yk)
    } 

    
    let type
    if (xinc===0 || yinc===0) 
        type ="rook"
    else type="bishop"
    //check threats
    let i=xinc
    let j=yinc
    while ( (xk+i<8 && yk+j<8) && (xk+i>=0 && yk+j>=0)){
      //console.log("xxxxxxxxxxx",x+i,x,xk,i)
      //console.log("ppppppppp",board[x+i][y+j])

      /* console.log("test",xk+i,yk+j) */
      if (board[xk+i][yk+j].getPiece()) {

        if(board[xk+i][yk+j].getPiece().getColor()!==color) {
            if (board[xk+i][yk+j].getPiece().getName()==="queen" || board[xk+i][yk+j].getPiece().getName()===type ){
                //console.log('danger at ',xk+i,yk+j)
                 return {threat:true,at:[xk+i,yk+j]}
              } 
            else {
                  // console.log('no threat at ' ,xk+i,yk+j)
                  break 
                }
            }
        else {
          if(xk+i !== x || yk+j!==y){
            //console.log('no threat at ' ,xk+i,yk+j)
            break 
          }
          
        }
      } 
    i+=xinc;j+=yinc

    }

    return false
  }

  move(from: number[],to: number[],board:Square[][]): void{
    let x1=from[0],y1=from[1]
    let x2=to[0],y2=to[1]
    board[x2][y2]=board[x1][y1]
    board[x1][y1]=new Square()
    this.curPosition=[x2,y2]
    
  }

  

}
