import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  sidebar:boolean = false;
  constructor() { }

  validation_messages =  [
    { type: 'required', message: "Required Field" },
    { type:'email', message:'Enter the Valid email Id'},
    { type: 'minlength', message: 'Username must be at least 4 characters long' },
    { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
    { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    { type: 'validUsername', message: 'Your username has already been taken' }
];
  toggle(){
    this.sidebar = !this.sidebar;
  }

}
