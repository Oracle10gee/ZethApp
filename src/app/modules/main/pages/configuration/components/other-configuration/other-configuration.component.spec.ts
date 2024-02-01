import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherConfigurationComponent } from './other-configuration.component';

describe('OtherConfigurationComponent', () => {
  let component: OtherConfigurationComponent;
  let fixture: ComponentFixture<OtherConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
