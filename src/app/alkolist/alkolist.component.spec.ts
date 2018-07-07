import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkolistComponent } from './alkolist.component';

describe('AlkolistComponent', () => {
  let component: AlkolistComponent;
  let fixture: ComponentFixture<AlkolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlkolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
