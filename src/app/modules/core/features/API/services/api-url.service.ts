import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Creates absolute API URLs from the application's configured API base URL.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  create(path: string): string {
    const normalizedBaseUrl = environment.apiUrl.replace(/\/+$/, '');
    const normalizedPath = path.replace(/^\/+/, '');

    return normalizedPath
      ? `${normalizedBaseUrl}/${normalizedPath}`
      : normalizedBaseUrl;
  }
}
