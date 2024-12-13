import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiodataComponent } from './biodata.component';

describe('BiodataComponent', () => {
  let component: BiodataComponent;
  let fixture: ComponentFixture<BiodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiodataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
