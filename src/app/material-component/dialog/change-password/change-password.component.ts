import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/Global-constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm : any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    public dialogRef:MatDialogRef<ChangePasswordComponent>,
    private snackBar: SnackbarService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:[null, [Validators.required]],
      newPassword:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]]
    })
  }

  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
      return true;
    }
    else{
      return false;
    }
  }

  handleChangePasswordSubmit(){
    let formData = this.changePasswordForm.value;
    let data = {
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
      confirmPassword:formData.confirmPassword
    }
    this.userService.changepassword(data).subscribe((response:any)=>{
      this.responseMessage = response?.Message;
      this.dialogRef.close();
      this.snackBar.opensnackbar(this.responseMessage,"success");
    },(error)=>{
      console.log(error);
      if(error.error?.Message){
        this.responseMessage = error.error?.Message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.opensnackbar(this.responseMessage,GlobalConstants.error);
    })
  }

}
