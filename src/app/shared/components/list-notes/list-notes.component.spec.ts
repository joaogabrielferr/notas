import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotesComponent } from './list-notes.component';

describe('ListNotesComponent', () => {
  let component: ListNotesComponent;
  let fixture: ComponentFixture<ListNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListNotesComponent]
    });
    fixture = TestBed.createComponent(ListNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
