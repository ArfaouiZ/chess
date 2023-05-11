import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from '../models/board/board.component';
import { GameComponent } from '../models/game/game.component';
import { BoardService } from './services/boardservice/board.service';
import { ChatComponent } from './components/chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ChatService } from './services/chatservice/chat.service';
import { UserService } from './services/userservice/user.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    ChatComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BoardService,ChatService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
