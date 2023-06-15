import { HttpClient } from '@angular/common/http';
import { Component, InjectionToken, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  showtable = false;
  objects: any[];
  constructor(private http: HttpClient,private router: Router, private authService: AuthService) {}
  currentPage = 1;
  itemsPerPage = 2;


  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  getTotalPages(): number {
    return Math.ceil(this.objects.length / this.itemsPerPage);
  }
  //calculates pagenumbers for gven items
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.objects.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }
  //get the sliced list items for each page
  getPaginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.objects.slice(startIndex, endIndex);
  }

 
  
  ngOnInit() :void{
    this.Objects();
    this.authService.canaccess();  
  }
  logout() {
    this.http.get<any>('https://final-vy64.onrender.com/logout').subscribe(
      response => {
        console.log('Logout successful');
        this.router.navigate(['/']);
        localStorage.removeItem('authToken')
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }

//to  get the list of users from the api
  Objects(){
    this.http.get<any[]>('https://final-vy64.onrender.com/student_list?page=1&page_size=10').subscribe(
      response => {
        this.objects = response;         
      },
      error => {
        console.error('Error retrieving objects', error);
      }
    );

  }
}
