import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditblogComponent } from './add-editblog.component';

describe('AddEditblogComponent', () => {
  let component: AddEditblogComponent;
  let fixture: ComponentFixture<AddEditblogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditblogComponent]
    });
    fixture = TestBed.createComponent(AddEditblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
