import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'mango-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  constructor(private functions: AngularFireFunctions) {}

  private async runCall<O>(name: string, params?: any): Promise<O> {
    try {
      const call = this.functions.httpsCallable(name);
      const res = await call(params).toPromise();
      return res; // Require for runCall to catch
    } catch(err) {
      console.log(err.details);
      throw err;
    }
  }

  sync() {
    this.runCall('syncMangoPay');
  }
}
