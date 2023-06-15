import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  login(formData: any): Observable<any> {
    return this.http.post<any>('https://final-vy64.onrender.com/token', formData);
    
  }
  
  isAuth():boolean{
    if(localStorage.getItem('authToken')!==null){
      return true;

    }return false;
  }

  canaccess(){
    if(!this.isAuth()){
      alert("You need to regiser or login to access home page.");
      this.router.navigate(['/register']);
      }
  }  
}


