import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);


  public onLogin(): void {
    this.authService.login("user","password").subscribe((user) => {
      this.router.navigateByUrl('/heroes');
    }
    );

  }

}
