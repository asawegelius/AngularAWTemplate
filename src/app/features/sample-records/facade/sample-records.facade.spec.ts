import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SampleRecordsFacade } from './sample-records.facade';
import { loadSampleRecords } from '../state/sample-record.actions';

describe('SampleRecordsFacade', () => {
  let facade: SampleRecordsFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), SampleRecordsFacade]
    });

    facade = TestBed.inject(SampleRecordsFacade);
    store = TestBed.inject(MockStore);
  });

  it('should dispatch loadSampleRecords', () => {
    vi.spyOn(store, 'dispatch');

    facade.loadSampleRecords();

    expect(store.dispatch).toHaveBeenCalledWith(loadSampleRecords());
  });
});
