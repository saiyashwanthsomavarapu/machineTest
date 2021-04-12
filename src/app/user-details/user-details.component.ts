import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../services/service.service';

export interface userData{
  'name':string,
  'email': string,
  'gender': string,
  'address': string,
  'dob': any
}
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetailsForm:FormGroup;
  // GENDERS
  genders=[
    {"value":'male'},
    {"value":'female'}
  ]

  constructor(private _formbuilder:FormBuilder, @Inject(MAT_DIALOG_DATA) data:userData, public service:ServiceService) {

    // USER FORM
    this.userDetailsForm = this._formbuilder.group({
      'id':new FormControl(data[0].id,[]),
      'name':new FormControl(data[0].name,[Validators.required,Validators.minLength(3)]),
      'email': new FormControl(data[0].email,[Validators.required,Validators.email]),
      'gender': new FormControl(data[0].gender,[Validators.required]),
      'address': new FormControl(data[0].address,[Validators.required,Validators.minLength(4)]),
      'dob': new FormControl(new Date(data[0].dob),[Validators.required])
    })
   }

  ngOnInit(): void {

  }

  submit(formDirective){
    console.log(this.userDetailsForm.value)
  }
}
