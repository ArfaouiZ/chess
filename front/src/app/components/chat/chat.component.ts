import { Component,Input,OnInit} from '@angular/core';
import * as moment from 'moment';
import { ChatService } from 'src/app/services/chatservice/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  

  @Input() sender:string=""
  @Input() receiver: string=""
  @Input() roomCode:string=""

  messages:any =[]

  /* @Input() messages:any=[{text:"where are you going now billy fucking walsh vinny chase ari gold turtle johnny",time:"9:12pm"}] */

  constructor(private chatservice: ChatService){}

  ngOnInit(): void {
    this.chatservice.getMessages().subscribe((message)=>{
      this.messages.push(message)
    })
  }

  
  sendMessage(msg:HTMLInputElement):void{
    let message={sender:this.sender,content:msg.value,time:moment().format('h:mm a')}
    this.messages.push(message)
    msg.value=""
    this.chatservice.sendMessage(message,this.roomCode)
  }

  handleKeyUp(e:any,msg:HTMLInputElement){
    if(e.keyCode === 13)
      this.sendMessage(msg)
     

  }

}
