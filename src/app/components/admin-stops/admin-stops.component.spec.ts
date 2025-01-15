import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStopsComponent } from './admin-stops.component';

describe('AdminStopsComponent', () => {
  let component: AdminStopsComponent;
  let fixture: ComponentFixture<AdminStopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
