import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillProductComponent } from './view-bill-product.component';

describe('ViewBillProductComponent', () => {
  let component: ViewBillProductComponent;
  let fixture: ComponentFixture<ViewBillProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBillProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
