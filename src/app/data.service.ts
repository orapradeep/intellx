import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    // console.log("Change Message is called....");
    this.messageSource.next(message);
  }
}
