import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Import your standalone components
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProjectWidgetComponent } from './features/dashboard/widgets/project-widget/project-widget.component';
import { DeploymentWidgetComponent } from './features/dashboard/widgets/deployment-widget/deployment-widget.component';
import { PodWidgetComponent } from './features/dashboard/widgets/pod-widget/pod-widget.component';
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';@NgModule({
  // Remove all components from declarations - they are standalone
  declarations: [],
  // Import your standalone components and modules that will be used globally
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Import your standalone components here
    AppComponent,
    DashboardComponent,
    ProjectWidgetComponent,
    DeploymentWidgetComponent,
    PodWidgetComponent,
    LoadingSpinnerComponent,

  ],
  providers: [],
  // Since you're still using an NgModule, you need to bootstrap the AppComponent
  bootstrap: [AppComponent]
})
export class AppModule { }