import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Deployment } from '../../../../core/models/deployment.model';
import { NgClass, NgFor, NgIf, DatePipe } from '@angular/common';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';


@Component({
  selector: 'app-deployment-widget',
  templateUrl: './deployment-widget.component.html',
  styleUrls: ['./deployment-widget.component.scss'],
  standalone: true,
  imports: [NgClass, NgFor, NgIf, DatePipe, LoadingSpinnerComponent, ErrorMessageComponent]
})
export class DeploymentWidgetComponent implements OnChanges {
  @Input() deployments: any[] | null=[];;
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
   * Get deployment status color
   * @param status Deployment status
   * @returns CSS color class
   */
  getStatusColor(status: string): string {
    switch (status) {
      case 'Complete':
        return 'status-success';
      case 'Progressing':
        return 'status-warning';
      case 'Failed':
        return 'status-error';
      default:
        return 'status-neutral';
    }
  }

  /**
   * Format replicas information
   * @param deployment Deployment object
   * @returns Formatted replicas string
   */
  formatReplicas(deployment: Deployment): string {
    return `${deployment.availableReplicas || 0}/${deployment.replicas}`;
  }

  /**
   * Calculate replica progress percentage
   * @param deployment Deployment object
   * @returns Percentage as number
   */
  calculateReplicaPercentage(deployment: Deployment): number {
    if (!deployment.replicas) {
      return 0;
    }
    return Math.min(Math.round((deployment.availableReplicas || 0) / deployment.replicas * 100), 100);
  }
}
