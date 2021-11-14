import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  MaxMessageLength = 1000;

  @Input() disabled = false;
  @Input() message = '';
  @Input() encrypt = false;
  @Input() isText = true;

  @Output() messageChange = new EventEmitter<string>();
  @Output() disabledChange = new EventEmitter<boolean>();
  @Output() isTextChange = new EventEmitter<boolean>();
  @Output() encryptChange = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  onMessageChange(message: string) : void {
    this.messageChange.next(message);
  }

  isMessageTooLong(): boolean {
    return this.message && this.message.length > this.MaxMessageLength;
  }

  toggleEncrypt(): void {
    this.encrypt = !this.encrypt;
    this.encryptChange.next(this.encrypt);
  }

  toggleIsText(): void {
    this.isText = !this.isText;
    this.isTextChange.next(this.isText);
  }
}
