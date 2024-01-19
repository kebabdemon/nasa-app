import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  searchInput: string = '';
  items: any[] = [];
  nextPageLink: string | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    // Load previous search results from local storage on component initialization
    const savedSearchResults = localStorage.getItem('searchResults');
    if (savedSearchResults) {
      const parsedResults = JSON.parse(savedSearchResults);
      this.items = parsedResults.items;
      this.nextPageLink = parsedResults.nextPageLink;
    }
  }

  isImage(link: any): boolean {
    return link && link.href && link.href.toLowerCase().endsWith('.jpg');
  }

  isVideo(link: any): boolean {
    return link && link.href && (link.href.toLowerCase().includes('.mp4') || link.href.toLowerCase().includes('.webm'));
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url) as SafeResourceUrl;
  }

  getSearch() {
    const apiUrl = `https://images-api.nasa.gov/search?q=${this.searchInput}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.items = data.collection.items;
        this.nextPageLink = this.getNextPageLink(data.collection.links);

        // Save search results to local storage
        this.saveSearchResults();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToNextPage() {
    if (this.nextPageLink) {
      this.http.get(this.nextPageLink).subscribe(
        (data: any) => {
          this.items = data.collection.items;
          this.nextPageLink = this.getNextPageLink(data.collection.links);

          // Save search results to local storage
          this.saveSearchResults();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  getNextPageLink(links: any[]): string | null {
    const nextPage = links.find(link => link.rel === 'next');
    return nextPage ? nextPage.href : null;
  }

  saveSearchResults() {
    const searchResults = {
      items: this.items,
      nextPageLink: this.nextPageLink
    };

    // Save search results to local storage
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
  }
}
