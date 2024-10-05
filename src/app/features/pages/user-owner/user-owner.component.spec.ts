import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOwnerComponent } from './user-owner.component';

describe('UserOwnerComponent', () => {
  let component: UserOwnerComponent;
  let fixture: ComponentFixture<UserOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
