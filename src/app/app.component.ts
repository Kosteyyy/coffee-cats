import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Цифровой стенографист';
  constructor(private auth: AuthService) {}

  ngOnInit() {
    
  }
}
