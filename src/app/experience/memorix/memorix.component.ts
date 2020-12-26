import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-memorix',
  templateUrl: './memorix.component.html',
  styleUrls: ['./memorix.component.scss']
})
export class MemorixComponent implements OnInit {
  user = faUser;
  mobile= faMobileAlt;
  persona= faUserFriends;


  constructor() { }

  ngOnInit(): void {
  }

}
