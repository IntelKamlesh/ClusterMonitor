import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../../../../core/models/project.model';
import { NgClass, NgFor, NgIf, DatePipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';

@Component({
  selector: 'app-project-widget',
  templateUrl: './project-widget.component.html',
  styleUrls: ['./project-widget.component.scss'],
  standalone: true,
  imports: [NgClass, NgFor, NgIf, DatePipe, LoadingSpinnerComponent, ErrorMessageComponent]
})
export class ProjectWidgetComponent implements OnChanges {
  @Input() projects: any[] | null = [];
  @Input() loading: boolean | null = false;
  @Input() error: any | null = null;
  @Output() refresh = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    // No need to update dataSource as we're using pure Angular now
  }

  refreshData(): void {
    this.refresh.emit();
  }

  /**
   * Get status color based on project status
   * @param status Project status
   * @returns CSS color class
   */
  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-success';
      case 'Terminating':
        return 'status-warning';
      case 'Inactive':
        return 'status-error';
      default:
        return 'status-neutral';
    }
  }

  /**
   * Calculate resource usage percentage
   * @param used Used amount
   * @param limit Total limit
   * @returns Percentage as number
   */
  calculatePercentage(used: string, limit: string): number {
    if (!used || !limit) {
      return 0;
    }

    // Extract numeric values (assuming format like '100m' for CPU or '256Mi' for memory)
    const usedValue = this.parseResourceValue(used);
    const limitValue = this.parseResourceValue(limit);
    
    if (limitValue === 0) {
      return 0;
    }
    
    return Math.min(Math.round((usedValue / limitValue) * 100), 100);
  }

  /**
   * Parse resource value to a numeric value
   * @param value Resource value string
   * @returns Numeric value
   */
  private parseResourceValue(value: string): number {
    if (!value) return 0;
    
    // CPU parsing (e.g., '100m', '0.5')
    if (value.endsWith('m')) {
      return parseInt(value.slice(0, -1), 10);
    }
    
    // Memory parsing (e.g., '256Mi', '1Gi')
    if (value.endsWith('Mi')) {
      return parseInt(value.slice(0, -2), 10);
    }
    if (value.endsWith('Gi')) {
      return parseInt(value.slice(0, -2), 10) * 1024;
    }
    
    // Default case, try to parse as number
    return parseFloat(value);
  }
}
