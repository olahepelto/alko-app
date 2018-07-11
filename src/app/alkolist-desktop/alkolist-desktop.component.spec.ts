import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlkolistDesktopComponent} from './alkolist-desktop.component';

describe('AlkolistDesktopComponent', () => {
  let component: AlkolistDesktopComponent;
  let fixture: ComponentFixture<AlkolistDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlkolistDesktopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkolistDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
