import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Generic GET method for API calls
   * @param endpoint The API endpoint to call
   * @returns Observable of response
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Generic POST method for API calls
   * @param endpoint The API endpoint to call
   * @param data The data to send
   * @returns Observable of response
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Generic PUT method for API calls
   * @param endpoint The API endpoint to call
   * @param data The data to send
   * @returns Observable of response
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Generic DELETE method for API calls
   * @param endpoint The API endpoint to call
   * @returns Observable of response
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Error handler for HTTP requests
   * @param error The HTTP error
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
