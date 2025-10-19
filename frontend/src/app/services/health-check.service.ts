import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  private healthCheckRequestSource = new Subject<void>();
  
  healthCheckRequest$ = this.healthCheckRequestSource.asObservable();

  triggerHealthCheck() {
    this.healthCheckRequestSource.next();
  }
}
