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
  currentUser: User;
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
          this.localStorage.setIdRoom(this.idRoom);
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
      const userNew = resp.filter(user => user.name === this.user.name)[0];
      this.currentUser = userNew;
      this.localStorage.setData(userNew.id, userNew.id);
      
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
    
    const sameName = users.filter(user => user.name === this.user.name);
    console.log('MISMO: ', sameName);
    
    this.connectedUsers = [... new Set(users)];
  }
  
  /**
   * set align depending if is receiving or sending message
   *
   * @param {Message} message
   * @returns
   * @memberof ChatInboxComponent
   */
  setFxLayoutAlign(message: Message) {
    const fxLayoutAlign: string = 
      message.name === this.user.name ? 
        'end end' :
        'start start';

    return fxLayoutAlign;
  }
  
  /**
   * Returns message time in format hours:seconds
   *
   * @param {number} date
   * @returns
   * @memberof ChatInboxComponent
   */
  getMessageTime(date: number) {
    const fullDate = new Date(date)

    return `${ fullDate.getHours() }:${ fullDate.getMinutes() }`;
  }
  
  /**
   * delete all messages
   *
   * @memberof ChatInboxComponent
   */
  deleteMessages() {
    this.chatMessages = [];
  }
  
  /**
   * Leave the chat
   *
   * @memberof ChatInboxComponent
   */
  leave() {
    this.localStorage.removeData(this.currentUser.id);
    
    this.socket.close();
    this.router.navigate(['chat-register']);
  }
  
  /**
   * See historic messages record
   *
   * @memberof ChatInboxComponent
   */
  getHistoric() {
    
    this.socket.close();
    this.router.navigate(['chat-historic']);
  }

}
