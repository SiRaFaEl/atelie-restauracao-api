import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastHostComponent } from './core/components/toast-host/toast-host.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastHostComponent],
  template: `
    <router-outlet></router-outlet>
    <app-toast-host />
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ateliê Restauração';
}
