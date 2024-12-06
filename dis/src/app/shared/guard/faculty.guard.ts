import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FacultyGuard  {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    let response = await this.authService.isUserLoggedIn();
    if (response == false) {
      this.router.navigate(['/login']);
      return false;
    }
    if (response.userType == 'faculty') {
      return true;
    }
    this.router.navigate([response.userType]);
    return false;
  }
}
