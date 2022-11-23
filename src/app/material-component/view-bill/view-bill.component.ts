import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/Global-constant';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ViewBillProductComponent } from '../dialog/view-bill-product/view-bill-product.component';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  displayedColumns: string[] = ['name','email','contactNumber','paymentMethod','total','view'];
  dataSource:any;
  responseMessage:any;

  constructor(private billService:BillService,
    private dialog:MatDialog,
    private snackBar:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.billService.getBills().subscribe((response:any)=>{
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

handleViewAction(value:any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    data:value
  };
  dialogConfig.width = "100%";
  const dialogRef = this.dialog.open(ViewBillProductComponent,dialogConfig);
  this.router.events.subscribe(()=>{
    dialogRef.close();
  })
}


downloadReportAction(value:any){
  let data ={
    name:value.name,
    email:value.email,
    uuid:value.uuid,
    contactNumber:value.contactNumber,
    paymentMethod:value.paymentMethod,
    totalAmount:value.totalAmount,
    productDetails:value.productDetails
  }
  this.billService.getPdf(data).subscribe(
    (response)=>{
      saveAs(response,value.uuid+'.pdf');
    }
  )
}


handleDeleteAction(value:any){
const dialogConfig = new MatDialogConfig();
dialogConfig.data ={
  message :'delete'+ value.name+'bill'
};
const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
  this.deleteProduct(value.id);
  dialogRef.close();
})
}

deleteProduct(id:any){
  this.billService.delete(id).subscribe((response:any)=>{
    this.tableData();
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
