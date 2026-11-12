import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignOnComponent } from './sign-on.component';

describe('SignOnComponent', () => {
  let component: SignOnComponent;
  let fixture: ComponentFixture<SignOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignOnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignOnComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
