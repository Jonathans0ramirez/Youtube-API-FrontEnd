import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {

  private messageSource = new BehaviorSubject([0]);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Array<any>) {
    this.messageSource.next(message)
  }

}