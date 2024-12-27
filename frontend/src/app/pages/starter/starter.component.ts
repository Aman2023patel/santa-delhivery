import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppProfitExpensesComponent } from 'src/app/components/profit-expenses/profit-expenses.component';
import { SpendsComponent } from 'src/app/components/spends/spends';
import { AppBlogComponent } from 'src/app/components/apps-blog/apps-blog.component';
import { AppIconsComponent } from '../extra/map/maps.component';
import { AppOrdersComponent } from 'src/app/components/total-orders/orders.component';



@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppProfitExpensesComponent,
    AppOrdersComponent,
    SpendsComponent,
    AppBlogComponent,
    AppIconsComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }
