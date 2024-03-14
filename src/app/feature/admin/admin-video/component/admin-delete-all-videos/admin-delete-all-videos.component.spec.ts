import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteAllVideosComponent } from './admin-delete-all-videos.component';

describe('AdminDeleteAllVideosComponent', () => {
  let component: AdminDeleteAllVideosComponent;
  let fixture: ComponentFixture<AdminDeleteAllVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeleteAllVideosComponent]
    });
    fixture = TestBed.createComponent(AdminDeleteAllVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
