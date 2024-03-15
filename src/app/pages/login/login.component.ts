import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialLoginComponent } from '../../components/social-login/social-login.component';

@Component({
  selector: 'custom-login',
  standalone: true,
  imports: [SocialLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { }
