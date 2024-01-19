import { Component, OnInit } from '@angular/core';
import { NasaApiService } from '../services/nasa-api/nasa-api.service';

@Component({
  selector: 'app-MarsRover',
  templateUrl: 'MarsRover.page.html',
  styleUrls: ['MarsRover.page.scss']
})
export class MarsRoverPage implements OnInit {
  marsRoverData: any;
  solRange: number = 0;

  constructor(private weatherApiService: NasaApiService) {}

  ngOnInit() {
    const cachedData = localStorage.getItem('marsRoverData');
    if (cachedData) {
      this.marsRoverData = JSON.parse(cachedData);
      console.log('Loaded Mars Rover data from localStorage:', this.marsRoverData);
    }
  }

  onSubmit() {
    this.weatherApiService.MarsRover$(this.solRange).subscribe(
      (response) => {
        if (response && response.photos) {
          this.marsRoverData = response;
          console.log('Mars Rover API Data:', response);
          console.log('Number of photos:', response.photos.length);

          localStorage.setItem('marsRoverData', JSON.stringify(response));
        } else {
          console.warn('Invalid response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching Mars Rover data:', error);
      }
    );
  }
}
