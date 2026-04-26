import { SampleRecord, SampleRecordCategory } from '../models/sample-record.interface';

export class MockSampleRecord implements SampleRecord {
    id: number = 1;
    title: string = 'Website refresh';
    owner: string = 'Alex Johnson';
    phone: string = '+1-555-0100';
    email: string = 'alex.johnson@example.com';
    createdAt: Date = new Date('2024-03-01T00:00:00.000Z');
    category: SampleRecordCategory = new MockSampleRecordCategory();

}

export class MockSampleRecordCategory implements SampleRecordCategory {
    key: string = 'design';
    label: string = 'Design';

}
