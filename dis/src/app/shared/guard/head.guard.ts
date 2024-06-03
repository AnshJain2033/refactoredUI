import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HeadGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    let response = await this.authService.isUserLoggedIn();
    if (response == false) {
      this.router.navigate(['/login']);
      return false;
    }
    if (response.userType == 'head') {
      return true;
    }
    this.router.navigate([response.userType]);
    return false;
  }
//   canActivate() {
//     let res = this.authService.isUserLoggedIn(); 
//     console.log(res);
    
//     if(res && res.userType == 'head'){
//       this.router.navigate([res.userType]);
//       return true;
//     }
//   //  if(this.authService.isUserLoggedIn())
//   //     return false;
//     if(!res){
//       this.router.navigate(['/login']);
//       return false;
//     }
//      this.router.navigate([res.userType]);
//       return true;
// }
}
