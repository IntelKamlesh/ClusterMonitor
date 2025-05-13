import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';

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
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
