import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContractorComponent } from './profile-contractor.component';

describe('ProfileContractorComponent', () => {
  let component: ProfileContractorComponent;
  let fixture: ComponentFixture<ProfileContractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileContractorComponent]
    });
    fixture = TestBed.createComponent(ProfileContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
