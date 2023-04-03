import { TableService } from "../services/tables/table.service";

export class Table<T> {
    headers: TableHeader[] = [];
    columns: TableColumn[] = [];
    displayedColumns: string[] = [];
    editableColumns: string[] = [];
    columnLinks: Map<string, string> = new Map<string, string>();
    data;
    constructor(headers: TableHeader[], columns: TableColumn[], data: TableService<T>, editableColumns?: string[]) {
        this.headers = headers;
        this.columns = columns;
        this.data = data;
        this.getColumnValues();
        this.editableColumns = (editableColumns) ? editableColumns : [];
    }

    getColumnValues() {
        this.displayedColumns = [];
        for (const col of this.columns) {
            this.displayedColumns.push(col.name);
        }
    }

    hasLink(col: string): boolean {
        return this.columnLinks.has(col);
    }

    isEditable(col: string): boolean {
        return this.editableColumns.includes(col);
    }
}

export class TableHeader {
    name: string;
    sorting: boolean;
    constructor(name: string, sorting: boolean) {
        this.name = name;
        this.sorting = sorting;
    }
}

export class TableColumn {
    name: string;
    icon: boolean;
    link?: string;
    constructor(name: string, icon: boolean, link?: string) {
        this.name = name;
        this.link = link;
        this.icon = icon;
    }
}