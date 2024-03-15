import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'custom-social-login',
  standalone: true,
  imports: [
    SocialLoginModule,
    GoogleSigninButtonModule,
    NgIf
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.CLIENT_ID_LOGIN_SOCIAL_GOOGLE
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    SocialAuthService
  ],
  templateUrl: './social-login.component.html',
  styleUrl: './social-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLoginComponent implements OnInit {

  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  constructor(
    protected socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}
