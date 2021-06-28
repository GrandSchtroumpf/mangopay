import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'mango-dashboard-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  users$ = this.db.collection<any>('users').valueChanges();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

}
