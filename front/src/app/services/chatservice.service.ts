import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  socket: Socket
  url:string="http://localhost:8080"

  constructor() {
    this.socket=io(this.url)
   }

   sendMessage(message:any,room: any): void {
    this.socket.emit('new-message', message,room);
  }

  createRomm(){

  }

  joinRoom(room: string){
    this.socket.emit("join room",room)

  }

  getMessages(): Observable<{text:string,user:string}> {
    return new Observable<{text:string,user:string}>(observer => {
      this.socket.on('new-message', (message: {text:string,user:string}) => {
        observer.next(message);
      });
    });
  }

  sendMove(move:any):any{
    this.socket.emit("move made",move)
  }

  getMove() : Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('move made', (move) => {
        observer.next(move);
      });
    });
  }

  getUsers() : Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('add user', (user) => {
        observer.next(user);
      });
    });
  }

  addUser(user: any){
    this.socket.emit("add user",user)
  }

}
