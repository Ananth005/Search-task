import { Component, Host } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
interface DataItem {
  askPrice: number;
  at: number;
  baseAsset: string;
  bidPrice: number;
  highPrice: number;
  lastPrice: number;
  lowPrice: number;
  openPrice: number;
  quoteAsset: string;
  symbol: string;
  volume: number;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  data: DataItem[] = [];
  filteredObjects: any[] = [];
  searchInput: string = '';
  filteredSuggestions: { baseAsset: string }[] = [];
  showSuggestionsFlag: boolean = false;
  Showtable: boolean = false;
  pagedObjects: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;


  constructor(private http: HttpClient) { }


  searchByKeyValue = (array: any[], key: string, value: any): any[] => {
    return array.filter(item => item[key] === value)
  };

  ngOnInit(): void {

    this.get()
  }





  get() {
    // base_url:string='https://disease.sh/v3/covid-19/countries/'
    // const url=this.base_url+this.country+'?strict=true'
    // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json
    // https://open.er-api.com/v6/latest/USD
    // https://api.wazirx.com/sapi/v1/tickers/24hr
    this.http.get<any>('https://api.wazirx.com/sapi/v1/tickers/24hr').subscribe(
      (response) => {
        // console.log(response);
        this.data = response;
      },
      (error) => {
        console.error('failed', error);
      }
    );
  }
  public showSuggestions(): void {
    this.filteredSuggestions = this.data.filter(suggestion =>
      suggestion.baseAsset.toLowerCase().includes(this.searchInput.toLowerCase())
    );

    this.showSuggestionsFlag = this.filteredSuggestions.length > 0;
  }

  search() {
    const searchResults = this.searchByKeyValue(this.data, 'baseAsset', this.searchInput);
    // console.log(searchResults);
    this.filteredObjects = [];
    searchResults.forEach((obj: {}) => {
      this.filteredObjects.push(obj);
      // const price=obj.askPrice;
      this.Showtable = true;
    });
  }
  loadData(data: any) {
    this.searchInput = data.baseAsset;
  }
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getTotalPages() {
    return Math.ceil(this.data.length / 10);
  }

  getPageNumbers() {
    return Array(this.getTotalPages()).fill(0).map((x, i) => i + 1);
  }
}
