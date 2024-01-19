import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MarsRoverPage } from './MarsRover.page';

describe('Tab2Page', () => {
  let component: MarsRoverPage;
  let fixture: ComponentFixture<MarsRoverPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarsRoverPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MarsRoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
