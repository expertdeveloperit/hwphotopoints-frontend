import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaplingsurvivalComponent } from './saplingsurvival.component';

describe('SaplingsurvivalComponent', () => {
  let component: SaplingsurvivalComponent;
  let fixture: ComponentFixture<SaplingsurvivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaplingsurvivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaplingsurvivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
