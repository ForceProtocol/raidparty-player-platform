import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../services/eventEmitter.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  constructor(private _messageService: EventService) { }

  ngOnInit() {
  }

  clickFilter(value): void {
    this._messageService.filter(value);
  }
}
