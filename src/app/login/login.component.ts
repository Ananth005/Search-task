import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder, NgForm} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
errorMessages: any;
  usernam: string;
  username: string;
  password: string;
 
  
 

constructor(private http: HttpClient,private router: Router,private authService: AuthService,private formBuilder: FormBuilder) {}

ngOnInit(f:NgForm) {
  this.load(f) 
}


private token:string='';
onSubmit(f: NgForm) {
  // console.log(f.value);
  const username=f.value.username;
  const password=f.value.password;
  this.authService.login(f.value).subscribe(
    (response )=> {
      // Handle successful login response
      console.log('Login successful');
      // console.log(response.access_token)
     this.router.navigate(['/home']);
     if (f.value.rememberMe) {
      // Store the access token in local storage
      localStorage.setItem('username',username);
      localStorage.setItem('password',password);
    }
    else{
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
      localStorage.setItem('authToken', response.access_token);
      this.token=localStorage.getItem('authToken');
    },
    (error )=> {
      // Handle login error
      console.error('Login failed',error);
      
      // alert("login failed" );
      
      alert(error.error.detail);
    
      
    }
  );
 

}
load(f:NgForm){
  this.username = localStorage.getItem('username');
  this.password = localStorage.getItem('password');
}

}
  


