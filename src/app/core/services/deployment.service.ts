import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer, of, throwError } from 'rxjs';
import { catchError, map, switchMap, shareReplay, tap, retry } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Deployment } from '../models/deployment.model';

@Injectable({
  providedIn: 'root'
})
export class DeploymentService {
  private deployments$ = new BehaviorSubject<Deployment[]>([]);
  private loadingDeployments$ = new BehaviorSubject<boolean>(false);
  private errorDeployments$ = new BehaviorSubject<string | null>(null);
  private refreshInterval = 30000; // 30 seconds

  constructor(private apiService: ApiService) {
    // Set up automatic refresh of data
    this.setupAutoRefresh();
  }

  /**
   * Get the list of deployments
   * @returns Observable of deployments array
   */
  getDeployments(): Observable<Deployment[]> {
    return this.deployments$.asObservable();
  }

  /**
   * Get the loading status
   * @returns Observable of loading status
   */
  getLoadingStatus(): Observable<boolean> {
    return this.loadingDeployments$.asObservable();
  }

  /**
   * Get the error status
   * @returns Observable of error message
   */
  getErrorStatus(): Observable<string | null> {
    return this.errorDeployments$.asObservable();
  }

  /**
   * Fetch the deployments from the API
   * @returns Observable of deployments array
   */
  fetchDeployments(): Observable<Deployment[]> {
    this.loadingDeployments$.next(true);
    this.errorDeployments$.next(null);

    return this.apiService.get<Deployment[]>('/deployments').pipe(
      tap(deployments => {
        this.deployments$.next(deployments);
        this.loadingDeployments$.next(false);
      }),
      catchError(error => {
        this.loadingDeployments$.next(false);
        this.errorDeployments$.next('Failed to load deployments data. Please try again later.');
        console.error('Error fetching deployments:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Refresh the deployments data
   */
  refreshDeployments(): void {
    this.fetchDeployments().subscribe();
  }

  /**
   * Setup automatic refresh of data
   */
  private setupAutoRefresh(): void {
    // Initial fetch
    this.refreshDeployments();

    // Then setup timer for periodic refresh
    timer(this.refreshInterval, this.refreshInterval)
      .pipe(
        switchMap(() => this.fetchDeployments()),
        retry(3),
        catchError(error => {
          console.error('Auto-refresh error:', error);
          return of([]);
        })
      )
      .subscribe();
  }
}
