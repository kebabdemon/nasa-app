import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NasaApiService {
  constructor(private http: HttpClient) {}

  MarsWeather$(): Observable<any> {
    const url = `${environment.baseUrl}/insight_weather/?api_key=${environment.apiToken}`;
    return this.getData(url, 'mars_weather');
  }

  APOD$(): Observable<any> {
    const url = `${environment.baseUrl}/planetary/apod?api_key=${environment.apiToken}`;
    return this.getData(url, 'apod');
  }

  EPIC$(): Observable<any> {
    const url = `${environment.baseUrl}/EPIC/api/natural/images?api_key=${environment.apiToken}`;

    // Log the request URL for debugging
    console.log('EPIC API Request URL:', url);

    // Return the observable for the API call
    return this.getData(url, 'epic');
  }

  MarsRover$(sol: any): Observable<any> {
    const url = `${environment.baseUrl}/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${environment.apiToken}`;
    console.log('MARSROVER API Request URL:', url);

    return this.http.get(url).pipe(
      tap((data) => {
        console.log('Mars Rover API Data:', data);
      }),
      catchError((error) => {
        console.error('Error fetching Mars Rover data:', error);
        return of(null);
      })
    );
  }




  private getData(url: string, key: string): Observable<any> {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {

      return of(JSON.parse(cachedData));
    } else {
      return this.http.get(url).pipe(
        tap((data) => {

          localStorage.setItem(key, JSON.stringify(data));
        }),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return of(null);
        })
      );
    }
  }
}
