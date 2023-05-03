import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  {

  user:any=""

  createUser(user:any){
    this.user=user.value
    this.chatservice.addUser(user.value)
    user.value=""
    
  }

  constructor(private chatservice: ChatserviceService){
   /*  this.chatservice.getUsers().subscribe((user)=>{
      this.users.push(user)
    }) */
  }

 
  
}
