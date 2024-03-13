import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingVideosComponent } from './pending-videos.component';

describe('PendingVideosComponent', () => {
  let component: PendingVideosComponent;
  let fixture: ComponentFixture<PendingVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingVideosComponent]
    });
    fixture = TestBed.createComponent(PendingVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
