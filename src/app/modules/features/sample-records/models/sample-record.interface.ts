export interface SampleRecord {
    id: number;
    title: string;
    owner: string;
    phone: string;
    email: string;
    createdAt: Date;
    category: SampleRecordCategory;
}


export interface SampleRecordCategory {
    key: string;
    label: string;
}
