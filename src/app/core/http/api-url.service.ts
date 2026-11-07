import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../config/app-config';

/**
 * Creates absolute API URLs from the application's configured API base URL.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
  private readonly config = inject(APP_CONFIG);

  create(path: string): string {
    const normalizedBaseUrl = this.config.apiUrl.replace(/\/+$/, '');
    const normalizedPath = path.replace(/^\/+/, '');

    return normalizedPath
      ? `${normalizedBaseUrl}/${normalizedPath}`
      : normalizedBaseUrl;
  }
}
