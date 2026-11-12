import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillPayComponent } from './bill-pay.component';

describe('BillPayComponent', () => {
  let component: BillPayComponent;
  let fixture: ComponentFixture<BillPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillPayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BillPayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
