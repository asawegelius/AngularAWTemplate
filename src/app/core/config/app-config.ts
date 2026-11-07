import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface AppConfig {
  readonly apiUrl: string;
}

/** Application-wide settings. Override this token to supply runtime configuration. */
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => ({ apiUrl: environment.apiUrl })
});
