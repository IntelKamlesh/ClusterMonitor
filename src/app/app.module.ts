import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProjectWidgetComponent } from './features/dashboard/widgets/project-widget/project-widget.component';
import { DeploymentWidgetComponent } from './features/dashboard/widgets/deployment-widget/deployment-widget.component';
import { PodWidgetComponent } from './features/dashboard/widgets/pod-widget/pod-widget.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectWidgetComponent,
    DeploymentWidgetComponent,
    PodWidgetComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
