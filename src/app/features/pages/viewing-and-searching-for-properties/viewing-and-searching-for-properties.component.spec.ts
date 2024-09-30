import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingAndSearchingForPropertiesComponent } from './viewing-and-searching-for-properties.component';

describe('ViewingAndSearchingForPropertiesComponent', () => {
  let component: ViewingAndSearchingForPropertiesComponent;
  let fixture: ComponentFixture<ViewingAndSearchingForPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewingAndSearchingForPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewingAndSearchingForPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
