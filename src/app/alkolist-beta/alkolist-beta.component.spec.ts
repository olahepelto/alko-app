import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkolistBetaComponent } from './alkolist-beta.component';

describe('AlkolistBetaComponent', () => {
  let component: AlkolistBetaComponent;
  let fixture: ComponentFixture<AlkolistBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlkolistBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkolistBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
