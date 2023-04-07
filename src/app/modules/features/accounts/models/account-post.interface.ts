/**
 * Represents an individual post in a bank account statement.
 * @interface
 */
export interface AccountPost {
    /**
     * The ID of the account to which this post belongs.
     * @type {number}
     */
    accountId: number,
    /**
     * The date of the post.
     * @type {Date}
     */
    date: Date;
    /**
     * A brief description of the post.
     * @type {string}
     */
    description: string;
    /**
     * The debit amount of the post (if applicable).
     * @type {number}
     */
    debit: number;
    /**
     * The credit amount of the post (if applicable).
     * @type {number}
     */
    credit: number;
    /**
     * The balance of the account after the post is made.
     * @type {number}
     */
    balance: number;
  }
  