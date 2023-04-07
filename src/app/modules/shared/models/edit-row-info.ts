/**
 * An interface representing the information for editing a row in a table.
 * @interface
 * @property {any} row - The row being edited.
 * @property {string} col - The column being edited.
 * @property {any} data - The new data to be updated in the table.
 * */
export interface EditRowInfo {
    row: any;
    col: string;
    data: any;
}
