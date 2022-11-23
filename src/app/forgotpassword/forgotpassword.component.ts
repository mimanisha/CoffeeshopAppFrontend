import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/Global-constant';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotpasswordForm:any = FormGroup;
  responseMessage : any;


  constructor(private formbuilder:FormBuilder,
     private user:UserService,
     private dialogRef:MatDialogRef<ForgotpasswordComponent>,
     private snackbar:SnackbarService,
  ) { }

  ngOnInit(): void {
    this.forgotpasswordForm = this.formbuilder.group({
      email : [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  handleSubmit(){
    var formData = this.forgotpasswordForm.value;
    var data = {
      email: formData.email
    }
    this.user.forgotpassword(data).subscribe((response:any)=>{
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbar.opensnackbar(this.responseMessage,"");
    },(error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.opensnackbar(this.responseMessage,GlobalConstants.error);
    
    })
  }

}
