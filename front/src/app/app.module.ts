import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from '../models/board/board.component';
import { GameComponent } from '../models/game/game.component';
import { ChatserviceService } from './services/chatservice.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ChatserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
