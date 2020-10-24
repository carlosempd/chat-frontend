import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-chat-historic',
  templateUrl: './chat-historic.component.html',
  styleUrls: ['./chat-historic.component.scss']
})
export class ChatHistoricComponent implements OnInit {
  
  
  messages: Message[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.messages = this.activatedRoute.snapshot.data.messages;
  }
  
  goToRegister() {
    this.router.navigate(['enter-chat']);
  }
  
  returnToChat() {
    this.router.navigate(['chat-inbox']);
  }

}
