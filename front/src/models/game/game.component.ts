import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chatservice/chat.service';
import { UserService } from 'src/app/services/userservice/user.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  user:string=""
  otherUser:string=""
  gameId:any=""

  ready:any=false

  /* messages:any =[] */
 
  //angular material spinner waiting for other players
  constructor(private usernameservice:UserService,private chatservice:ChatService,private route:ActivatedRoute){
    
    this.user=this.usernameservice.getUserName()
    this.gameId=this.route.snapshot.paramMap.get('gameId')

   
  }

  ngOnInit(): void {

    

    this.chatservice.onStartGame().subscribe((ready)=>{
      console.log("yoooo",ready)
      let {start,opponent}=ready
      this.ready=start
      this.otherUser=opponent
    })
    
    console.log(this.gameId,"game id")
    /* this.chatservice.getMessages().subscribe((message)=>{
      this.messages.push(message)
    }) */
    
    //should you make service suscription in constructor or oninit 

  }

  createUser(user:HTMLInputElement):void{
    this.user=user.value
    this.chatservice.joinGame({room:this.gameId,client:this.user})

  }

  /* sendMessage(msg:HTMLInputElement):void{
    let message={sender:this.user,content:msg.value}
    this.messages.push(message)
    msg.value=""
    this.chatservice.sendMessage(message,this.gameId)
  } */

}