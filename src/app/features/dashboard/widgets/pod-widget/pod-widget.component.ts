import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pod } from '../../../../core/models/pod.model';

@Component({
  selector: 'app-pod-widget',
  templateUrl: './pod-widget.component.html',
  styleUrls: ['./pod-widget.component.scss']
})
export class PodWidgetComponent implements OnChanges {
  @Input() pods: Pod[] | null = [];
  @Input() loading: boolean | null = false;
  @Input() error: string | null = null;
  @Output() refresh = new EventEmitter<void>();

  displayedColumns: string[] = ['name', 'namespace', 'phase', 'restarts', 'age'];
  dataSource = new MatTableDataSource<Pod>([]);
  
  // For pod status counts
  statusCounts = {
    running: 0,
    pending: 0,
    succeeded: 0,
    failed: 0,
    unknown: 0
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pods'] && this.pods) {
      this.dataSource.data = this.pods;
      this.updateStatusCounts();
    }
  }

  refreshData(): void {
    this.refresh.emit();
  }

  /**
   * Update status counts for summary
   */
  updateStatusCounts(): void {
    if (!this.pods) {
      return;
    }
    
    this.statusCounts = {
      running: 0,
      pending: 0,
      succeeded: 0,
      failed: 0,
      unknown: 0
    };
    
    for (const pod of this.pods) {
      switch (pod.phase) {
        case 'Running':
          this.statusCounts.running++;
          break;
        case 'Pending':
          this.statusCounts.pending++;
          break;
        case 'Succeeded':
          this.statusCounts.succeeded++;
          break;
        case 'Failed':
          this.statusCounts.failed++;
          break;
        case 'Unknown':
        default:
          this.statusCounts.unknown++;
          break;
      }
    }
  }

  /**
   * Get pod status color
   * @param phase Pod phase
   * @returns CSS color class
   */
  getStatusColor(phase: string): string {
    switch (phase) {
      case 'Running':
        return 'status-success';
      case 'Pending':
        return 'status-warning';
      case 'Succeeded':
        return 'status-info';
      case 'Failed':
        return 'status-error';
      default:
        return 'status-neutral';
    }
  }

  /**
   * Calculate pod age from creation timestamp
   * @param creationTimestamp ISO timestamp string
   * @returns Formatted age string
   */
  calculateAge(creationTimestamp: string): string {
    if (!creationTimestamp) {
      return 'Unknown';
    }
    
    const creationDate = new Date(creationTimestamp);
    const now = new Date();
    const diffMs = now.getTime() - creationDate.getTime();
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h`;
    }
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    
    return `${diffMinutes}m`;
  }
}
