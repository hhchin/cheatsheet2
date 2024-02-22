import { Component } from '@angular/core';
import Fuse from 'fuse.js';
import {Term, TermsList} from './terms.store';

interface FuseResult {
  item:Term;
  RefIndex:number;
}

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="search">
        <div class="header">
            <h1>Term Search</h1>
        
      </div>

      <input class="search-form" type="text" (input)="fuseSearch()" [(ngModel)]="searchTerm" name="searchTerm" autocomplete="on"  
      placeholder="Search over the 1225 acronyms and terms indexed" autofocus/>

      <div class="results">
      <li *ngFor="let result of resultsList">
        <a>{{result.item.longform}}</a>
      </li>
      </div>
    </div>

</div>
`,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = 'Term Search';
  searchTerm:string = '';
  fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [{
      name: 'shortform',
      weight: 0.6
    }, {
      name: 'longform',
      weight: 0.4
    }]
  };
  resultsList:FuseResult[] =[];

  fuse:any;
  
  constructor() {
    this.fuse = new Fuse(TermsList, this.fuseOptions);
   }

  fuseSearch() {
    let res = this.fuse.search(this.searchTerm, {limit: 10});
    console.log(res)
    this.resultsList = res
  }
}
