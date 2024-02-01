import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMerchantComponent } from './manage-merchant.component';

describe('ManageMerchantComponent', () => {
  let component: ManageMerchantComponent;
  let fixture: ComponentFixture<ManageMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMerchantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
