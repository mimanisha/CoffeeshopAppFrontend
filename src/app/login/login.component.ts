import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/Global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  responsemessage: any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private user: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null,Validators.required]
    })
  }

  handleSubmit(){
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.user.Login(data).subscribe((response:any)=>{
      // this.ngxService.stop();
      this.dialogRef.close();
      localStorage.setItem('token',response.token);
      this.router.navigate(['/cafe/dashboard']);
    },(error)=>{
      if(error.error?.message){
        this.responsemessage = error.error?.message;
      }
      else{
        this.responsemessage = GlobalConstants.genericError;
      }
      this.snackbarService.opensnackbar(this.responsemessage,GlobalConstants.error)
    
    })
  }
}
