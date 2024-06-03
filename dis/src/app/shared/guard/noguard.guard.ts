import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    this.canActivate();
  }
  // async canActivate(): Promise<boolean> {
  //   let response = await this.authService.isUserLoggedIn();
  //   if (response == false) {
  //     return true;
  //   }
  //   this.router.navigate([response.userType]);
  //   return false;
  // }
  canActivate() {
    let res = this.authService.isUserLoggedIn(); 
    if(res)
      return false;
  //  if(this.authService.isUserLoggedIn())
  //     return false;
    else
      return true;
}
}
