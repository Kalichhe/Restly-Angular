import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileOwnerComponent } from './user-profile-owner.component';

describe('UserProfileOwnerComponent', () => {
  let component: UserProfileOwnerComponent;
  let fixture: ComponentFixture<UserProfileOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
