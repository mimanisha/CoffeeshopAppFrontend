import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/Global-constant';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  displayedColumns:string[] =['name','email','contactNumber','status'];
  dataSource:any;
  responseMessage:any;

  constructor(private userService:UserService,
    private snackBar:SnackbarService) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.userService.getusers().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.opensnackbar(this.responseMessage,GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleChangeAction(status:any,id:any){
    let data = {
      status:status.toString(),
      id:id
    }
    this.userService.update(data).subscribe((response:any)=>{
      this.responseMessage = response?.message;
      this.snackBar.opensnackbar(this.responseMessage,"success");
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.opensnackbar(this.responseMessage,GlobalConstants.error);
    })
  }
}
