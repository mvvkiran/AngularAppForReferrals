import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricCardComponent } from './metric-card/metric-card.component';
import { ReferralTableComponent } from './referral-table/referral-table.component';
import { AddReferralFormComponent } from './add-referral-form/add-referral-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MetricCardComponent,
    ReferralTableComponent,
    AddReferralFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
