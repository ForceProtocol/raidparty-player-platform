import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  state: String;
  notifications: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private notification: NotificationService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.getNotification();
  }

  isActive(state) {
    return state === this.location.path().split('/')[1];
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  getNotification() {
    this.notification.getPlayerNotifications()
      .subscribe(data => {
        console.log(data);
        this.notifications = data['notifications'];
      }, errObj => {
        this.toaster.error('Error', errObj.error.err, {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      });
  }
}
