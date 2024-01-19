import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NASAPage } from './NASA.page';

describe('Tab1Page', () => {
  let component: NASAPage;
  let fixture: ComponentFixture<NASAPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NASAPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NASAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
