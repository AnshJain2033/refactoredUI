import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderItem, headerList } from './constants';
import { AuthService } from 'src/app/services/auth.service';
import { images } from 'src/assets/images';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() userType: string = '';
  @Output() public sidenavToggle = new EventEmitter();
  @Output() sidenavClose = new EventEmitter();

  renderList: HeaderItem[] = [];
  opened = true;
  public isLoggedIn:any;
  loginUser:any;
  images : any = images;

  constructor(private router: Router, private authService:AuthService) {
    this.isLoggedIn = this.authService.getStatus()
     .subscribe(currentStatus =>{
       this.isLoggedIn = currentStatus;
       console.log(this.isLoggedIn);
       
     });
  }

  ngOnInit(): void {
    // Initialize the renderList with the headerList for the userType
    this.renderList = headerList[this.userType];
    console.log(this.userType);
    
    if(this.isLoggedIn)
      this.loginUser = sessionStorage.getItem('username')!=null?sessionStorage.getItem('username'):" ";
  }
  
  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['welcome']);
  }

  public navigateToProfile(){
    let userType = sessionStorage.getItem('userType');
    this.router.navigate(['/'+userType+'/profile']);
  }

}
