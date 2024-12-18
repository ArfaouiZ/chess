import { Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: Socket
  url:string="http://localhost:8080"

  constructor() {
    this.socket=io(this.url)
   }

  sendMessage(message:{sender:string,content:string,time:number},room:string): void {
  this.socket.emit('new message', message,room);
  }

  getMessages(): Observable<{sender:string,content:string,time:number}> {
    return new Observable<{sender:string,content:string,time:number}>(observer => {
      this.socket.on('new message', (message) => {
        observer.next(message);
      });
    });
  }

  

  createGame(gameInfo:{room:string,client:string,gameSettings:any}){
    this.socket.emit("create game",gameInfo)
  }

  joinGame(gameInfo:{room:string,client:string}){
    this.socket.emit("join game",gameInfo)
  }

  onStartGame(): Observable<{start:boolean,opponent:string,gameSettings:any}> {

    return new Observable<{start:boolean,opponent:string,gameSettings:any}>(observer => {
      this.socket.on('start game', (ready) => {
        observer.next(ready);
      });
    });

  }

  onRoomException(): Observable<{exception:string}>{
    return new Observable<{exception:string}>(observer => {
      this.socket.on('room exception', (exception) => {
        observer.next(exception);
      });
    });

  }

  makeMove(move:any,room:any):void{
    this.socket.emit("move made",move,room)
  }

  onMoveMade(): Observable<any>{
    return new Observable<any>(observer => {
      this.socket.on('move made', (move) => {
        observer.next(move);
      });
    });
  }

  inGameOption(option:{opponent:string,type:string},room:string):void{
    this.socket.emit('in game option',option,room)

  }

  onInGameOption(): Observable<{opponent:string,type:string}>{
    return new Observable<{opponent:string,type:string}>(observer => {
      this.socket.on('in game option', (option) => {
        observer.next(option);
      });
    });

  }


}