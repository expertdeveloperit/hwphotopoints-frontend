import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchuploadCsvComponent } from './batchupload-csv.component';

describe('BatchuploadCsvComponent', () => {
  let component: BatchuploadCsvComponent;
  let fixture: ComponentFixture<BatchuploadCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchuploadCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchuploadCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
