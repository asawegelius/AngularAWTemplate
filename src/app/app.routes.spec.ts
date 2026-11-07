import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { firstValueFrom } from 'rxjs';
import { APP_CONFIG } from '@core/config/app-config';
import { appConfig } from './app.config';
import { SampleRecordsFacade } from './features/sample-records/facade/sample-records.facade';
import { MockSampleRecord } from './features/sample-records/testing/sample-record.fixtures';

describe('Application feature routing', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ...appConfig.providers,
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com' } }
      ]
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it.each(['/', '/sample-records', '/unknown'])(
    'should load and display records through the lazy feature when visiting %s',
    async (url) => {
      const harness = await RouterTestingHarness.create(url);
      const facade = harness.routeDebugElement!.injector.get(SampleRecordsFacade);
      const record = new MockSampleRecord();

      expect(TestBed.inject(Router).url).toBe('/sample-records');
      expect(TestBed.inject(SampleRecordsFacade, null)).toBeNull();
      expect(await firstValueFrom(facade.isLoading$)).toBe(true);

      http.expectOne('https://api.example.com/sample-records').flush([record]);
      harness.detectChanges();
      await harness.fixture.whenStable();

      expect(await firstValueFrom(facade.sampleRecords$)).toEqual([record]);
      expect(await firstValueFrom(facade.isLoaded$)).toBe(true);
      expect(harness.routeNativeElement?.textContent).toContain(record.title);
      expect(harness.routeNativeElement?.textContent).toContain(record.owner);
    }
  );

  it('should expose API failures through the feature facade', async () => {
    const harness = await RouterTestingHarness.create('/sample-records');
    const facade = harness.routeDebugElement!.injector.get(SampleRecordsFacade);

    http.expectOne('https://api.example.com/sample-records').flush('Failed', {
      status: 500,
      statusText: 'Server Error'
    });

    expect(await firstValueFrom(facade.isLoading$)).toBe(false);
    expect(await firstValueFrom(facade.error$)).toContain('500');
  });
});
