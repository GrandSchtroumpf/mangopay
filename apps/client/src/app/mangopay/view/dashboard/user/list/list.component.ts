import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'mango-dashboard-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  users$ = this.db.collection<any>('users').valueChanges();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

}
