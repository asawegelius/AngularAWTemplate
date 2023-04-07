/**
 * Represents a bank account.
 * @interface
 */
interface Account {
    /**
     * The account number for this account.
     * @type {string}
     */
    accountNumber: string;
  
    /**
     * The ID of the customer that owns this account.
     * @type {number}
     */
    customerId: number;
  
    /**
     * The current balance of this account.
     * @type {number}
     */
    balance: number;
  
    /**
     * The currency used by this account.
     * @type {string}
     */
    currency: string;
  
    /**
     * The type of account.
     * @type {'Savings' | 'Checking'}
     */
    accountType: 'Savings' | 'Checking';
  }
  