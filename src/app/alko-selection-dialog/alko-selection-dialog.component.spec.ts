import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlkoSelectionDialogComponent} from './alko-selection-dialog.component';

describe('AlkoSelectionDialogComponent', () => {
  let component: AlkoSelectionDialogComponent;
  let fixture: ComponentFixture<AlkoSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlkoSelectionDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkoSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
