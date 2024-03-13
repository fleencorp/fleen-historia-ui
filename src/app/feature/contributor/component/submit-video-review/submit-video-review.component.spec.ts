import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitVideoReviewComponent } from './submit-video-review.component';

describe('SubmitVideoReviewComponent', () => {
  let component: SubmitVideoReviewComponent;
  let fixture: ComponentFixture<SubmitVideoReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitVideoReviewComponent]
    });
    fixture = TestBed.createComponent(SubmitVideoReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
