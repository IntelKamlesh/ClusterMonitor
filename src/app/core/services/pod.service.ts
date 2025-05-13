import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer, of, throwError } from 'rxjs';
import { catchError, map, switchMap, shareReplay, tap, retry } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Pod } from '../models/pod.model';

@Injectable({
  providedIn: 'root'
})
export class PodService {
  private pods$ = new BehaviorSubject<Pod[]>([]);
  private loadingPods$ = new BehaviorSubject<boolean>(false);
  private errorPods$ = new BehaviorSubject<string | null>(null);
  private refreshInterval = 15000; // 15 seconds (more frequent for pods as they change more often)

  constructor(private apiService: ApiService) {
    // Set up automatic refresh of data
    this.setupAutoRefresh();
  }

  /**
   * Get the list of pods
   * @returns Observable of pods array
   */
  getPods(): Observable<Pod[]> {
    return this.pods$.asObservable();
  }

  /**
   * Get the loading status
   * @returns Observable of loading status
   */
  getLoadingStatus(): Observable<boolean> {
    return this.loadingPods$.asObservable();
  }

  /**
   * Get the error status
   * @returns Observable of error message
   */
  getErrorStatus(): Observable<string | null> {
    return this.errorPods$.asObservable();
  }

  /**
   * Fetch the pods from the API
   * @returns Observable of pods array
   */
  fetchPods(): Observable<Pod[]> {
    this.loadingPods$.next(true);
    this.errorPods$.next(null);

    return this.apiService.get<Pod[]>('/pods').pipe(
      tap(pods => {
        this.pods$.next(pods);
        this.loadingPods$.next(false);
      }),
      catchError(error => {
        this.loadingPods$.next(false);
        this.errorPods$.next('Failed to load pods data. Please try again later.');
        console.error('Error fetching pods:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get pods filtered by namespace
   * @param namespace The namespace to filter by
   * @returns Observable of filtered pods array
   */
  getPodsByNamespace(namespace: string): Observable<Pod[]> {
    return this.pods$.pipe(
      map(pods => pods.filter(pod => pod.namespace === namespace))
    );
  }

  /**
   * Refresh the pods data
   */
  refreshPods(): void {
    this.fetchPods().subscribe();
  }

  /**
   * Setup automatic refresh of data
   */
  private setupAutoRefresh(): void {
    // Initial fetch
    this.refreshPods();

    // Then setup timer for periodic refresh
    timer(this.refreshInterval, this.refreshInterval)
      .pipe(
        switchMap(() => this.fetchPods()),
        retry(3),
        catchError(error => {
          console.error('Auto-refresh error:', error);
          return of([]);
        })
      )
      .subscribe();
  }
}
