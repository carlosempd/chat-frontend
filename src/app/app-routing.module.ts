import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRegisterComponent } from './components/chat-register/chat-register.component';
import { ChatInboxComponent } from './components/chat-inbox/chat-inbox.component';


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
    path: '**', pathMatch: 'full', redirectTo: 'enter-chat'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
