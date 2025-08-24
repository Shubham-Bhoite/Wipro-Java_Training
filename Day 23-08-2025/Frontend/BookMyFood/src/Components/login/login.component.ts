import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Interface/user';
import { FormsModule } from '@angular/forms';
import { JwtToken } from '../../Interface/jwt-token';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {

  constructor(private router:Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
    
  ){}

  user = {
    userEmail:'',
    passWord:'',
    userName:''
  }

  users:User[]=[]

  jwtToken : JwtToken={token:''} 

  ngOnInit(){
    this.userService.getUser().subscribe((user)=>{
      this.cdr.detectChanges();
      this.users = user;
    })
  }

  login() {
  console.log("inside login ");
  this.userService.login(this.user).subscribe({
    next: (response) => {
      console.log("Login API response:", response);

      if (response && response.token) {
        this.jwtToken = response;
        localStorage.setItem('tokenValue', response.token);
        this.router.navigate(['/food']);
      } else {
        console.error("No token received from backend", response);
      }
    },
    error: (error) => {
      if (error.status === 401) {
        alert("Invalid email or password! Please try again.");
      } else {
        alert("Something went wrong. Please try again later.");
      }
      console.error("Error while sign in", error);
    }
  });
}



   

}