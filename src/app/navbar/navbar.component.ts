import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  logout() {
    sessionStorage.clear()
    window.location.reload()
  }

  ngOnInit() {
  }

}
