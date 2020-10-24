import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { User } from 'src/app/model/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Message } from '../../model/message.model';
import { ApiService } from '../../services/api.service';

const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit, AfterViewChecked {
  user: User;
  connectedUsers: User[];
  chatMessages: Message[];
  idRoom: string;
  socket;
  form: FormGroup;
  @ViewChild('chatBox') private chatBox: ElementRef;

  constructor(private localStorage: LocalStorageService,
              private apiService: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.localStorage.getUser();
    this.connectedUsers = [];
    this.chatMessages = [];

    this.setUpSocketConnection();

    this.form = new FormGroup({
      message: new FormControl('')
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    // scroll to bottom
    this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
  }

  /**
   * Send Message Action
   */
  send() {
    const message: Message = this.form.value;
    
    if (message.message.trim().length > 0) {
      
      this.form.setValue({ message: ''});
  
      this.socket.emit('createMessage', message, (resp: Message) => {
        
        if (!this.idRoom) {
          this.idRoom = resp.idAddressee;
          this.localStorage.setData(this.idRoom);
        }
  
        const newMessage: Message = { ...resp, me: this.user.name === resp.name };
  
        this.chatMessages.push(newMessage);
  
      });
    }


  }

  setUpSocketConnection() {
    // Connect with backend socket
    this.socket = io(SOCKET_ENDPOINT);
  
    // Notify new user to room
    this.socket.emit('enterChat', this.user, (resp: User[]) => {

        this.updateUsersList(resp);

    });
      

    // Listen to Create Message (when send or receive message)
    this.socket.on('createMessage', (data: Message) => {
      const newMessage: Message = { ...data, me: this.user.name === data.name };
      this.chatMessages.push(newMessage);

      this.socket.on('listUser', (users: User[]) => {
        this.updateUsersList(users);
      });
    });
  }

  /**
   * Update list of connected users
   *
   * @param User[] users
   *  ChatInboxComponent
   */
  updateUsersList(users: User[]) {
    this.connectedUsers = [... new Set(users)];
  }

  setFxLayoutAlign(message: Message) {
    const fxLayoutAlign: string = 
      message.name === this.user.name ? 
        'end end' :
        'start start';

    return fxLayoutAlign;
  }

  getMessageTime(date: number) {
    const fullDate = new Date(date)

    return `${ fullDate.getHours() }:${ fullDate.getMinutes() }`;
  }
  
  deleteMessages() {
    this.chatMessages = [];
  }
  
  leave() {
    this.localStorage.removeUser();
    this.socket.close();
    this.router.navigate(['chat-register']);
  }
  
  getHistoric() {
    
    this.socket.close();
    this.router.navigate(['chat-historic']);
  }

}
