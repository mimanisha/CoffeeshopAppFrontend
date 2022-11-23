import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/Global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupform:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private user:UserService,
    private snackbar:SnackbarService,
    private router:Router,
    private dialogRef:MatDialogRef<SignupComponent>,
    ) { }

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password:[null,[Validators.required]],

    })
  }

  handlesubmit(){
    
    var formData = this.signupform.value;
    var data ={
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password
    }
    this.user.signup(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.responseMessage=response?.message;
      this.snackbar.opensnackbar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error)=>{
      if(error.error?.message)
      {
        this.responseMessage=error.error?.message;
      }
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbar.opensnackbar(this.responseMessage,GlobalConstants.error);
    })
  }
}
