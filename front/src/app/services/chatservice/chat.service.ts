import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  sendMessage(message:{sender:string,content:string,time:string},room:string): void {
  this.socket.emit('new message', message,room);
  }

  getMessages(): Observable<{sender:string,content:string,time:string}> {
    return new Observable<any>(observer => {
      this.socket.on('new message', (message) => {
        observer.next(message);
      });
    });
  }

  

  createGame(gameInfo:{room:string,client:string}){
    this.socket.emit("create game",gameInfo)
  }

  joinGame(gameInfo:{room:string,client:string}){
    this.socket.emit("join game",gameInfo)
  }

  /* onJoinGame(){
    return new Observable<any>(observer => {
      this.socket.on('join game', (otheruser) => {
        observer.next(otheruser);
      });
    });

  } */

  onStartGame(): Observable<{start:boolean,opponent:string}> {

    return new Observable<{start:boolean,opponent:string}>(observer => {
      this.socket.on('start game', (ready) => {
        observer.next(ready);
      });
    });

  }


}