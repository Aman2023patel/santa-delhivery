import { Routes } from '@angular/router';


// pages
import { AppIconsComponent } from './map/maps.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { ProfileComponent } from './profile/profile.component';
import { FortuneWheelComponent } from './fortune-wheel/fortune-wheel.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'icons',
        component: AppIconsComponent,
      },
      {
        path: 'sample-page',
        component: AppSamplePageComponent,
      },
      {
        path: 'fortune-wheel',
        component: FortuneWheelComponent,
      }
      ,
      // {
      //   path: 'profile',
      //   component: ProfileComponent
      // }
    ],
  },
];
