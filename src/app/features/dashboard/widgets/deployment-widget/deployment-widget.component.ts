import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Deployment } from '../../../../core/models/deployment.model';

@Component({
  selector: 'app-deployment-widget',
  templateUrl: './deployment-widget.component.html',
  styleUrls: ['./deployment-widget.component.scss']
})
export class DeploymentWidgetComponent implements OnChanges {
  @Input() deployments: Deployment[] | null = [];
  @Input() loading: boolean | null = false;
  @Input() error: string | null = null;
  @Output() refresh = new EventEmitter<void>();

  displayedColumns: string[] = ['name', 'namespace', 'replicas', 'status', 'strategy'];
  dataSource = new MatTableDataSource<Deployment>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deployments'] && this.deployments) {
      this.dataSource.data = this.deployments;
    }
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
