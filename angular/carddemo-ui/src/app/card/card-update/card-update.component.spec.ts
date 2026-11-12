import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardUpdateComponent } from './card-update.component';

describe('CardUpdateComponent', () => {
  let component: CardUpdateComponent;
  let fixture: ComponentFixture<CardUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardUpdateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
