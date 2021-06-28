import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import type { User } from '@mangopay/sdk';

interface DisplayUser {
  type: 'legal' | 'natural';
  name: string;
  email: string;
  
}

@Component({
  selector: 'mango-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() users: unknown[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
