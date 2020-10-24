import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHistoricComponent } from './components/chat-historic/chat-historic.component';
import { ChatInboxComponent } from './components/chat-inbox/chat-inbox.component';
import { ChatRegisterComponent } from './components/chat-register/chat-register.component';
import { MessageResolver } from './resolvers/messages.resolver';


const routes: Routes = [
  {
    path: 'enter-chat',
    component: ChatRegisterComponent
  },
  {
    path: 'chat-inbox',
    component: ChatInboxComponent
  },
  {
    path: 'chat-historic',
    component: ChatHistoricComponent,
    resolve: {
      messages: MessageResolver
    }
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'enter-chat'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
