import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmContainerComponent } from './mm-container.component';

describe('MmContainerComponent', () => {
  let component: MmContainerComponent;
  let fixture: ComponentFixture<MmContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
