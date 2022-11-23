import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
// import { ViewBillProductComponent } from './dialog/view-bill-product/view-bill-product.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ProductComponent } from './dialog/product/product.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ViewBillProductComponent } from './dialog/view-bill-product/view-bill-product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    // ViewBillProductsComponent,
    CategoryComponent,
    ChangePasswordComponent,
    ConfirmationComponent,
    ProductComponent,
    ManageCategoryComponent,
    ManageOrderComponent,
    ManageProductComponent,
    ManageUserComponent,
    ViewBillComponent,
    ViewBillProductComponent    
  ]
})
export class MaterialComponentsModule {}
