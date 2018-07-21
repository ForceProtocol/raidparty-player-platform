import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { EventService } from '../services/eventEmitter.service';

@Component({
  selector: 'app-marketplace-search-navbar',
  templateUrl: './marketplace-search-navbar.component.html',
  styleUrls: ['./marketplace-search-navbar.component.css']
})

export class MarketplaceSearchNavbarComponent implements OnInit {
  platformType: string;
  productCategory: string;
  constructor(
    private _messageService: EventService,
    private location: Location) 
  {
      this.platformType = 'pc';
      this.productCategory = 'games';
  }

  ngOnInit() {
      this.platformType = 'pc';
      this.productCategory = 'games';
  }

  setProductCategory(value): void {
    this.productCategory = value;
    this._messageService.filter(value);
  }

  setPlatform(value): void {
    this.platformType = value;
    this._messageService.filter(value);
  }

  isActive(state) {
    return state === this.location.path().split('/')[1];
  }

}
