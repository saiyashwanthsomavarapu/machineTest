import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProgressComponent } from '../progress/progress.component';
import { UserDetailsComponent } from '../user-details/user-details.component';

export interface deleteDailoge{
  id:number;
  name:string
}

// DUMMY DATA
const ELEMENT_DATA = [
  {id:1,name: 'sai', email: 'sai@gmail.com', gender: 'male', address: 'ABCD',dob:'Sat Apr 10 2021 00:00:00 GMT+0530'},
  {id:2,name: 'yaswanth', email: 'Yaswanth@gmail.com', gender: 'male', address: 'ABCD',dob:'10-04-2021'},
  {id:3,name: 'pavani', email: 'pavani@gmail.com', gender: 'female', address: 'ABCD',dob:'10-04-2021'},
  {id:4,name: 'kalyani', email: 'kalyani@gmail.com', gender: 'female', address: 'ABCD',dob:'10-04-2021'},
  {id:5,name: 'mounika', email: 'mounika@gmail.com', gender: 'female', address: 'ABCD',dob:'10-04-2021'},
  {id:6,name: 'rajesh', email: 'rajesh@gmail.com', gender: 'male', address: 'ABCD',dob:'10-04-2021'},
  {id:7,name: 'kiran', email: 'kiran@gmail.com', gender: 'male', address: 'ABCD',dob:'10-04-2021'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  outdata:any;
  // TABLE LABLES
  displayedColumns: string[] = ['Name', 'Email', 'Gender', 'Address', 'Action'];
  dataSource;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
      this.dataSource = ELEMENT_DATA
  }

  // FUNCTIO TO GET COUNT THE GENDER
  getUsersCounts(value){
    var count =0;
    for(var i=0;i<this.dataSource.length;i++){
      if(this.dataSource[i].gender == value){
        count++;
      }
    }
    // console.log(count)
    return count;
  }

  // DELETE FUNCTION FOR THE USER DATA
  openDialog(id): void {
    var name= this.dataSource.filter(e=> { return e.id==id?e.name:''})
    const dialogRef = this.dialog.open(AlertDialog, {
      width: '250px',
      data: {id:id,name:name[0].name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var outdata = result;
      if(outdata!=undefined){
        this.dataSource = this.dataSource.filter(e=>e.id!=outdata.id)
      }
      this.dataSource = this.dataSource
      console.log(this.dataSource)
    });
  }

  // EDIT FUNCTION FOR THE USERDATA 
  edit(id): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '80%',
      height:'550px',
      data: ELEMENT_DATA.filter(e=>e.id==id)
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      this.outdata = result;
      await this.dataSource.filter(e=>{
        if(e.id==this.outdata.id){
          e['address'] = this.outdata.address
          e['email'] = this.outdata.email
          e['dob'] = this.outdata.dob 
          e['name'] = this.outdata.name
          e['gender'] = this.outdata.gender
        }
      })

    });
  }
}


// DELETE PROMT COMPONENT
@Component({
  selector: 'app-alert',
  templateUrl: 'alert-dialog.html',
})

export class AlertDialog {

  alertdata:any;
  constructor(public dialogRef: MatDialogRef<AlertDialog>,@Inject(MAT_DIALOG_DATA) data:deleteDailoge) {
    console.log(data);
    this.alertdata = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}