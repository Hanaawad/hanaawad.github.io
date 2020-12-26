import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bannerlanding',
  templateUrl: './bannerlanding.component.html',
  styleUrls: ['./bannerlanding.component.scss']
})
export class BannerlandingComponent implements OnInit {
  faCoffee = faCoffee;

  constructor() { }

  ngOnInit() {
  }

}
