import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';

type State = 'loading' | 'idle' | 'hover' | 'uploading';

// Natural user: 'IDENTITY_PROOF' | 'ADDRESS_PROOF'
// User 'REGISTRATION_PROOF' | 'ARTICLES_OF_ASSOCIATION' | 'SHAREHOLDER_DECLARATION' | 

@Component({
  selector: 'mango-kyc-form',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class KycFormComponent {
  private state = new BehaviorSubject<State>('loading');
  options = ['IDENTITY_PROOF', 'ADDRESS_PROOF'];
  types = '.pdf,.png,.jpg,.jpeg';

  @HostListener('dragover', ['$event'])
  onDragOver($event: DragEvent) {
    $event.preventDefault();
    this.state.next('hover');
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.state.next('idle');
  }

  @HostListener('drop', ['$event'])
  async onDrop($event: DragEvent) {
    $event.preventDefault();
    this.readFile($event.dataTransfer?.files.item(0) || null);
  }
  constructor() { }

  file(event: Event) {
    const input = event.target as HTMLInputElement;
    this.readFile(input.files?.item(0));
  }

  readFile(file?: File | null) {
    if (file) {
      if (file.type.includes('image')) {

      } else {
        throw new Error('Unsupported type: ' + file.type);
      }
    }
  }
}
