import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from '../../services/feedback.service';
import { ListingFeedback } from '../../models/location.models';

interface FeedbackReport {
  id: number;
  listingId?: number;
  listingName?: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

@Component({
  selector: 'app-reports-issues',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './reports-issues.html',
  styleUrl: './reports-issues.css'
})
export class ReportsIssuesComponent implements OnInit {
  reports: FeedbackReport[] = [];
  allReports: FeedbackReport[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // Pagination properties
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;

  // Expose Math for template
  Math = Math;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.feedbackService.getAllFeedbacks().subscribe({
      next: (response: ListingFeedback[]) => {
        this.allReports = response.map(feedback => ({
          id: feedback.id,
          listingId: feedback.listingId,
          listingName: feedback.listingName,
          feedback: feedback.feedback,
          createdAt: feedback.createdAt,
          updatedAt: feedback.updatedAt,
          status: 'new' // Default status since backend doesn't provide it yet
        }));
        this.collectionSize = this.allReports.length;
        this.refreshReports();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading reports:', error);
        this.errorMessage = 'Failed to load reports';
        this.isLoading = false;
      }
    });
  }

  refreshReports(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.reports = this.allReports.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.refreshReports();
  }

  viewReport(report: FeedbackReport): void {
    console.log('Viewing report:', report);
    // TODO: Implement view report modal
  }

  markAsReviewed(report: FeedbackReport): void {
    report.status = 'reviewed';
    console.log('Marked as reviewed:', report);
    // TODO: Implement API call to update status
  }

  markAsResolved(report: FeedbackReport): void {
    report.status = 'resolved';
    console.log('Marked as resolved:', report);
    // TODO: Implement API call to update status
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
