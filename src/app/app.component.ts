import { Component } from '@angular/core';
import { ParaderoService } from './services/paradero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lightbusweb-app';
  constructor(public paraderoService:ParaderoService){

  }
}
