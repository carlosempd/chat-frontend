import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field/';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatHistoricComponent } from './components/chat-historic/chat-historic.component';
import { ChatInboxComponent } from './components/chat-inbox/chat-inbox.component';
import { ChatRegisterComponent } from './components/chat-register/chat-register.component';
import { MessageResolver } from './resolvers/messages.resolver';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';





@NgModule({
  declarations: [
    AppComponent,
    ChatInboxComponent,
    ChatRegisterComponent,
    ChatHistoricComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    NgtUniversalModule
  ],
  providers: [LocalStorageService, ApiService, MessageResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
