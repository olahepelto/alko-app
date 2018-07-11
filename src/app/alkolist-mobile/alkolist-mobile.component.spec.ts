import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlkolistMobileComponent} from './alkolist-mobile.component';

describe('AlkolistMobileComponent', () => {
  let component: AlkolistMobileComponent;
  let fixture: ComponentFixture<AlkolistMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlkolistMobileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkolistMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
