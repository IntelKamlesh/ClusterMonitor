import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ProjectService } from '../../core/services/project.service';
import { DeploymentService } from '../../core/services/deployment.service';
import { PodService } from '../../core/services/pod.service';
import { Project } from '../../core/models/project.model';
import { Deployment } from '../../core/models/deployment.model';
import { Pod } from '../../core/models/pod.model';
import { AsyncPipe, NgClass, DatePipe } from '@angular/common';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { PodWidgetComponent } from './widgets/pod-widget/pod-widget.component';
import { ProjectWidgetComponent } from './widgets/project-widget/project-widget.component';
import { DeploymentWidgetComponent } from './widgets/deployment-widget/deployment-widget.component';

interface DashboardSummary {
  projectCount: number;
  deploymentCount: number;
  podCount: number;
  activeProjects: number;
  successfulDeployments: number;
  runningPods: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    DatePipe,
    ProjectWidgetComponent,
    DeploymentWidgetComponent,
    PodWidgetComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Data observables
  projects$: Observable<Project[]>;
  deployments$: Observable<Deployment[]>;
  pods$: Observable<Pod[]>;
  dashboardSummary$: Observable<DashboardSummary>;
  
  // Loading states
  projectsLoading$: Observable<boolean>;
  deploymentsLoading$: Observable<boolean>;
  podsLoading$: Observable<boolean>;
  
  // Error states
  projectsError$: Observable<string | null>;
  deploymentsError$: Observable<string | null>;
  podsError$: Observable<string | null>;
  
  private destroy$ = new Subject<void>();
  
  constructor(
    public projectService: ProjectService,
    public deploymentService: DeploymentService,
    public podService: PodService
  ) { 
    // Initialize observables
    this.projects$ = this.projectService.getProjects();
    this.deployments$ = this.deploymentService.getDeployments();
    this.pods$ = this.podService.getPods();
    
    this.projectsLoading$ = this.projectService.getLoadingStatus();
    this.deploymentsLoading$ = this.deploymentService.getLoadingStatus();
    this.podsLoading$ = this.podService.getLoadingStatus();
    
    this.projectsError$ = this.projectService.getErrorStatus();
    this.deploymentsError$ = this.deploymentService.getErrorStatus();
    this.podsError$ = this.podService.getErrorStatus();
    
    // Create dashboard summary from combined observables
    this.dashboardSummary$ = combineLatest([
      this.projects$,
      this.deployments$,
      this.pods$
    ]).pipe(
      map(([projects, deployments, pods]) => {
        return {
          projectCount: projects.length,
          deploymentCount: deployments.length,
          podCount: pods.length,
          activeProjects: projects.filter(p => p.status === 'Active').length,
          successfulDeployments: deployments.filter(d => d.status === 'Complete').length,
          runningPods: pods.filter(p => p.phase === 'Running').length
        };
      })
    );
  }

  ngOnInit(): void {
    // Trigger initial data refresh
    this.refreshAllData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Refresh all dashboard data
   */
  refreshAllData(): void {
    this.projectService.refreshProjects();
    this.deploymentService.refreshDeployments();
    this.podService.refreshPods();
  }
}
