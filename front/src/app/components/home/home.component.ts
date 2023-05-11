import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chatservice/chat.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { v4 } from 'uuid'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router,private userservice:UserService,private chatservice:ChatService){}

  

  createUser(userInput:HTMLInputElement){

    //get user input
    let user=userInput.value

    //generate new game id
    let gameId=v4()
    console.log(gameId,"gamecode")

    //send gameinfo to user service
    this.userservice.setUserName(user)
    

    //create new room in server
    this.chatservice.createGame({room:gameId,client:user})

    this.router.navigate(['game/'+gameId])
    


  }

}
