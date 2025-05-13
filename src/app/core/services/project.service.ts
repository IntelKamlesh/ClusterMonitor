import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer, of, throwError } from 'rxjs';
import { catchError, map, switchMap, shareReplay, tap, retry } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects$ = new BehaviorSubject<Project[]>([]);
  private loadingProjects$ = new BehaviorSubject<boolean>(false);
  private errorProjects$ = new BehaviorSubject<string | null>(null);
  private refreshInterval = 30000; // 30 seconds

  constructor(private apiService: ApiService) {
    // Set up automatic refresh of data
    this.setupAutoRefresh();
  }

  /**
   * Get the list of projects
   * @returns Observable of projects array
   */
  getProjects(): Observable<Project[]> {
    return this.projects$.asObservable();
  }

  /**
   * Get the loading status
   * @returns Observable of loading status
   */
  getLoadingStatus(): Observable<boolean> {
    return this.loadingProjects$.asObservable();
  }

  /**
   * Get the error status
   * @returns Observable of error message
   */
  getErrorStatus(): Observable<string | null> {
    return this.errorProjects$.asObservable();
  }

  /**
   * Fetch the projects from the API
   * @returns Observable of projects array
   */
  fetchProjects(): Observable<Project[]> {
    this.loadingProjects$.next(true);
    this.errorProjects$.next(null);

    return this.apiService.get<Project[]>('/projects').pipe(
      tap(projects => {
        this.projects$.next(projects);
        this.loadingProjects$.next(false);
      }),
      catchError(error => {
        this.loadingProjects$.next(false);
        this.errorProjects$.next('Failed to load projects data. Please try again later.');
        console.error('Error fetching projects:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Refresh the projects data
   */
  refreshProjects(): void {
    this.fetchProjects().subscribe();
  }

  /**
   * Setup automatic refresh of data
   */
  private setupAutoRefresh(): void {
    // Initial fetch
    this.refreshProjects();

    // Then setup timer for periodic refresh
    timer(this.refreshInterval, this.refreshInterval)
      .pipe(
        switchMap(() => this.fetchProjects()),
        retry(3),
        catchError(error => {
          console.error('Auto-refresh error:', error);
          return of([]);
        })
      )
      .subscribe();
  }
}
