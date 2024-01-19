import { Component, OnInit } from '@angular/core';
import { NasaApiService } from "../services/nasa-api/nasa-api.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-NASA',
  templateUrl: 'NASA.page.html',
  styleUrls: ['NASA.page.scss']
})
export class NASAPage implements OnInit {

  MarsWeatherData: any = {};
  APODdata: any = {};
  EPIC: any = {};

  // Use the non-null assertion operator
  weather$!: Observable<any>;

  constructor(
    private weatherApiService: NasaApiService
  ) {}

  ngOnInit() {
    this.weatherApiService.MarsWeather$().subscribe(MarsData => this.MarsWeatherData = MarsData);
    this.weatherApiService.APOD$().subscribe(APODdata => this.APODdata = APODdata);
    this.weatherApiService.EPIC$().subscribe(EPIC => this.EPIC = EPIC);
  }

  protected getEpicImageUrl(imageName: string, date: string): string {
    const apiKey = 'RMC8QsCSTkUdqds7SZzpTmdt8T9Yh9krMnH4GA7P';

    // Format date in the 'YYYY/MM/DD' pattern
    const formattedDate = date.split(' ')[0].replace(/-/g, '/');

    // Construct the image URL
    return `https://api.nasa.gov/EPIC/archive/natural/${formattedDate}/png/${imageName}.png?api_key=${apiKey}`;
  }


  onImageError(event: any) {
    console.error('Image error:', event);
  }
}
