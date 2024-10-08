import React, { useEffect, useState } from 'react';
import styles from './FeedList.module.css';
import AscendingIcon from '../images/ascending.svg';
import DescendingIcon from '../images/descending.svg';
import { now } from 'moment';

interface FeedListProps {
  timestamp?: number | null;
}

interface User {
  id: number;
  name: string;
}

interface InvoiceDetails {
  id: number;
  supplier_name: string;
  sent_from: User | null;
  received_date: number;
  invoice_state: string;
  invoice_amount: number;
}

// Create an array of InvoiceDetails objects
const invoiceDetailsArray: InvoiceDetails[] = [
  {
    id: 879273,
    supplier_name: 'Lorem Ornare',
    sent_from: { id: 1, name: 'Flores, Juanita' },
    received_date: new Date('2024-08-08T10:34:00').getTime(),
    invoice_state: 'Processed',
    invoice_amount: 1500,
  },
  {
    id: 837408374,
    supplier_name: 'Bibendum',
    sent_from: { id: 2, name: 'Cooper, Kristin' },
    received_date: new Date('2024-09-08T10:32:00').getTime(),
    invoice_state: 'Processed',
    invoice_amount: 3200,
  },
  {
    id: 23672957,
    supplier_name: 'Parturient Malesuada Sem',
    sent_from: { id: 3, name: 'Cooper, Kristin' },
    received_date: new Date('2024-10-07T10:34:00').getTime(),
    invoice_state: 'New',
    invoice_amount: 8450,
  },
  {
    id: 349835,
    supplier_name: 'Magna Malesuada',
    sent_from: { id: 4, name: 'Nguyen, Shane' },
    received_date: new Date('2024-10-06T10:34:00').getTime(),
    invoice_state: 'Processed',
    invoice_amount: 1800,
  },
  {
    id: 34984,
    supplier_name: 'Fermentum Venenatis Tortor',
    sent_from: { id: 5, name: 'Henry, Arthur' },
    received_date: new Date('2024-10-05T10:34:00').getTime(),
    invoice_state: 'Failed',
    invoice_amount: 2100,
  },
  {
    id: 4398294,
    supplier_name: 'Parturient Venenatis Etiam',
    sent_from: { id: 4, name: 'Nguyen, Shane' },
    received_date: new Date('2024-07-10T10:34:00').getTime(), // Adjusted the date formatting
    invoice_state: 'Processed',
    invoice_amount: 10320,
  },
  {
    id: 38946834,
    supplier_name: 'Malesuada Ipsum',
    sent_from: { id: 4, name: 'Nguyen, Shane' },
    received_date: new Date('2024-09-15T10:34:00').getTime(),
    invoice_state: 'Confirmed',
    invoice_amount: 3200,
  },
  {
    id: 3287323,
    supplier_name: 'Malesuada Fermentum Tortor',
    sent_from: { id: 6, name: 'Black, Marvin' },
    received_date: new Date('2021-01-01T00:00:00').getTime(),
    invoice_state: 'Confirmed',
    invoice_amount: 3200,
  },
  {
    id: 32782,
    supplier_name: 'Ullamcorper',
    sent_from: { id: 7, name: 'Miles, Esther' },
    received_date: new Date('2024-10-22T00:00:00').getTime(),
    invoice_state: 'Failed',
    invoice_amount: 3200,
  },
  {
    id: 239239,
    supplier_name: 'Ridiculus',
    sent_from: { id: 1, name: 'Flores, Juanita' },
    received_date: new Date('2024-09-11T00:00:00').getTime(),
    invoice_state: 'Confirmed',
    invoice_amount: 3200,
  },
];

const getStatusStyle = (state: string) => {
  switch (state) {
    case 'Processed':
      return styles.statusProcessed;
    case 'New':
      return styles.statusNew;
    case 'Failed':
      return styles.statusFailed;
    case 'Confirmed':
      return styles.statusConfirmed;
    default:
      return '';
  }
};

const FeedList: React.FC<FeedListProps> = ({ timestamp }) => {
  const [isAmountAscending, setIsAmountAscending] = useState<boolean>(true);
  const [isDateAscending, setIsDateAscending] = useState<boolean>(false);
  const [invoiceAmountSummary, setInvoiceAmountSummary] = useState<InvoiceDetails[]>(invoiceDetailsArray);
  const [activeSortColumn, setActiveSortColumn] = useState<'amount' | 'date' | null>('date'); // Tracks which column is sorted

  useEffect(() => {
    if (timestamp) {
      const filteredData = invoiceDetailsArray.filter(
        (invoice) => invoice.received_date >= timestamp,
      );
      const sortedData = filteredData.sort((a, b) => b.received_date - a.received_date); // Default to latest dates at the top
      setInvoiceAmountSummary(sortedData);
      setActiveSortColumn('date'); // Set 'date' as the active sorting column
      setIsDateAscending(true); // Ensure it's sorted from newest to oldest
    } else {
      setInvoiceAmountSummary(invoiceDetailsArray);
    }
  }, [timestamp]);

  const handleAmountSort = () => {
    const sortedAmount = [...invoiceAmountSummary].sort((a, b) =>
      isAmountAscending ? a.invoice_amount - b.invoice_amount : b.invoice_amount - a.invoice_amount,
    );
    setInvoiceAmountSummary(sortedAmount);
    setIsAmountAscending(!isAmountAscending);
    setActiveSortColumn('amount'); // Set 'amount' as the active sorting column
  };

  const handleDateSort = () => {
    const sortedDate = [...invoiceAmountSummary].sort((a, b) =>
      isDateAscending ? a.received_date - b.received_date : b.received_date - a.received_date,
    );
    setInvoiceAmountSummary(sortedDate);
    setIsDateAscending(!isDateAscending);
    setActiveSortColumn('date'); // Set 'date' as the active sorting column
  };

  return (
    <div className={styles.feedlist}>
      <div className={styles.headercell}>
        <div className={styles.headerContents}>
          <b className={styles.string}>ID</b>
          <b className={styles.string2}>Supplier name</b>
          <b className={styles.string3}>Sent from</b>
          
          <div
            className={`${styles.string2} ${styles.headerContainer} ${activeSortColumn === 'date' ? styles.activeSort : ''}`}
            style={{ cursor: 'pointer', color: activeSortColumn === 'date' ? '#5b5fc7': '#d8d8d8' }}
            onClick={handleDateSort}
          >
            <b className={`${styles.string2} ${styles.b}`}>Received date</b>
            <img
              src={isDateAscending ? AscendingIcon : DescendingIcon}
              alt={isDateAscending ? 'Ascending' : 'Descending'}
              className={`${styles.sortIcon} ${activeSortColumn === 'date' ? styles.activeSortIcon : ''}`}
              style={{ filter: activeSortColumn === 'date' ? 'hue-rotate(100deg)' : 'none' }} // Blue for active sort
            />
          </div>

          <b className={styles.string4}>Invoice state</b>

          <div
            className={`${styles.string3} ${activeSortColumn === 'amount' ? styles.activeSort : ''}`}
            style={{ cursor: 'pointer', color: activeSortColumn === 'amount' ? '#5b5fc7' : '#d8d8d8' }}
            onClick={handleAmountSort}
          >
            <b className={`${styles.string3} ${styles.b}`}>Invoice amount</b>
            <img
              src={isAmountAscending ? AscendingIcon : DescendingIcon}
              alt={isAmountAscending ? 'Ascending' : 'Descending'}
              className={styles.sortIcon}
              style={{ filter: activeSortColumn === 'amount' ? 'hue-rotate(100deg)' : 'none' }} // Blue for active sort
            />
          </div>
        </div>
      </div>

      <div className={`${styles.horizontalContainer} ${styles.table}`}>
        <ul>
          {invoiceAmountSummary.map((invoice) => (
            <li key={invoice.id} className={styles.bodycell}>
              <div className={styles.headerContents}>
                <div className={styles.string}>{invoice.id}</div>
                <div className={styles.string2}>{invoice.supplier_name}</div>
                <div className={styles.string3}>
                  {invoice.sent_from ? invoice.sent_from.name : 'N/A'}
                </div>
                <div className={styles.string2}>
                  {new Date(invoice.received_date).toLocaleString()}
                </div>
                <div className={`${styles.string4}`}>
                  <div className={getStatusStyle(invoice.invoice_state)}>
                    {invoice.invoice_state}
                  </div>
                </div>
                <div className={styles.string3}>€{invoice.invoice_amount}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedList;