import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceSearchNavbarComponent } from './marketplace-search-navbar.component';

describe('MarketplaceSearchNavbarComponent', () => {
  let component: MarketplaceSearchNavbarComponent;
  let fixture: ComponentFixture<MarketplaceSearchNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceSearchNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceSearchNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
