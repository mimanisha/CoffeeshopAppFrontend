import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-product',
  templateUrl: './view-bill-product.component.html',
  styleUrls: ['./view-bill-product.component.scss']
})
export class ViewBillProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total'];
  dataSource: any;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  public dialogRef: MatDialogRef<ViewBillProductComponent>) { }

  ngOnInit(): void {

    this.data = this.dialogData.data;
    this.dataSource = JSON.parse(this.dialogData.data.productDetails);
  }

}
