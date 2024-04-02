import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpsignupComponent } from './otpsignup.component';

describe('OtpsignupComponent', () => {
  let component: OtpsignupComponent;
  let fixture: ComponentFixture<OtpsignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpsignupComponent]
    });
    fixture = TestBed.createComponent(OtpsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
