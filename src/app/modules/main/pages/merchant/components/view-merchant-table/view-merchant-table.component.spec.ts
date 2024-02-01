import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMerchantTableComponent } from './view-merchant-table.component';

describe('ViewMerchantTableComponent', () => {
  let component: ViewMerchantTableComponent;
  let fixture: ComponentFixture<ViewMerchantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMerchantTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMerchantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
