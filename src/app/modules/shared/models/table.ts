import { TableService } from "../services/tables/table.service";

/**
 * Represents a generic table that can display a list of items.
 * @template T The type of the data items in the table.
 */
export class Table<T> {
    /**
     * The headers for the table.
     * @type {TableHeader[]}
     */
    headers: TableHeader[] = [];

    /**
     * The columns for the table.
     * @type {TableColumn[]}
     */
    columns: TableColumn[] = [];

    /**
     * The list of columns to be displayed in the table.
     * @type {string[]}
     */
    displayedColumns: string[] = [];

    /**
     * The list of columns that are editable.
     * @type {string[]}
     */
    editableColumns: string[] = [];

    /**
     * A map that contains links associated with each column.
     * @type {Map<string, string>}
     */
    columnLinks: Map<string, string> = new Map<string, string>();

    /**
     * The data service that provides the data for the table.
     * @type {TableService<T>}
     */
    data: TableService<T>;

    /**
     * Constructs a new table with the specified headers, columns, and data service.
     * @param {TableHeader[]} headers The headers for the table.
     * @param {TableColumn[]} columns The columns for the table.
     * @param {TableService<T>} data The data service that provides the data for the table.
     * @param {string[]} [editableColumns] The list of columns that are editable.
     */
    constructor(headers: TableHeader[], columns: TableColumn[], data: TableService<T>, editableColumns?: string[]) {
        this.headers = headers;
        this.columns = columns;
        this.data = data;
        this.setColumnValues();
        this.editableColumns = (editableColumns) ? editableColumns : [];
    }

    /**
     * Sets the displayed columns for the table.
     */
    setColumnValues() {
        this.displayedColumns = [];
        for (const col of this.columns) {
            this.displayedColumns.push(col.name);
        }
    }

    /**
     * Checks whether a given column has a link associated with it.
     * @param {string} col The name of the column.
     * @returns {boolean} True if the column has a link associated with it, false otherwise.
     */
    hasLink(col: string): boolean {
        return this.columnLinks.has(col);
    }

    /**
     * Checks whether a given column is editable.
     * @param {string} col The name of the column.
     * @returns {boolean} True if the column is editable, false otherwise.
     */
    isEditable(col: string): boolean {
        return this.editableColumns.includes(col);
    }
}

/**
 * Represents a header for a table column.
 */
export class TableHeader {
    /**
     * The name of the header.
     * @type {string}
     */
    name: string;

    /**
     * Whether the column should be sorted.
     * @type {boolean}
     */
    sorting: boolean;

    /**
     * Constructs a new table header with the specified name and sorting flag.
     * @param {string} name The name of the header.
     * @param {boolean} sorting Whether the column should be sorted.
     */
    constructor(name: string, sorting: boolean) {
        this.name = name;
        this.sorting = sorting;
    }
}

/**
 * Represents a column in a table.
 */
export class TableColumn {
    /**
     * The name of the column.
     * @type {string}
     */
    name: string;
    icon: boolean;
    link?: string;
    constructor(name: string, icon: boolean, link?: string) {
        this.name = name;
        this.link = link;
        this.icon = icon;
    }
}