import DataTable from 'react-data-table-component';
import { useState, useMemo } from 'react';
import styles from './EmployeeTable.module.scss';

/**
 * EmployeeTable — a searchable, sortable, paginated table built on `react-data-table-component`.
 * Replaces the jQuery DataTables plugin.
 *
 * Props:
 *   @prop {Array} employees — array of employee objects to display
 *     Each object must have: firstName, lastName, startDate, department,
 *     dateOfBirth, street, city, state, zipCode
 *
 * Usage:
 *   <EmployeeTable employees={employees} />
 */

/** Column definitions matching the original DataTables configuration */
const columns = [
  { name: 'First Name',   selector: (row) => row.firstName,   sortable: true },
  { name: 'Last Name',    selector: (row) => row.lastName,    sortable: true },
  { name: 'Start Date',   selector: (row) => row.startDate,   sortable: true },
  { name: 'Department',   selector: (row) => row.department,  sortable: true },
  { name: 'Date of Birth',selector: (row) => row.dateOfBirth, sortable: true },
  { name: 'Street',       selector: (row) => row.street,      sortable: true },
  { name: 'City',         selector: (row) => row.city,        sortable: true },
  { name: 'State',        selector: (row) => row.state,       sortable: true },
  { name: 'Zip Code',     selector: (row) => row.zipCode,     sortable: true },
];

/** Custom react-data-table-component styles aligned to the design system */
const customTableStyles = {
  headRow: {
    style: {
      backgroundColor: 'var(--color-primary)',
      color: '#fff',
      fontSize: '0.875rem',
      fontWeight: 600,
      borderRadius: '8px 8px 0 0',
    },
  },
  headCells: {
    style: { color: '#fff', paddingLeft: '16px', paddingRight: '16px' },
  },
  rows: {
    style: {
      fontSize: '0.875rem',
      color: 'var(--color-text)',
      '&:not(:last-of-type)': { borderBottom: '1px solid var(--color-border)' },
    },
    highlightOnHoverStyle: {
      backgroundColor: 'rgba(29, 78, 137, 0.05)',
      transitionDuration: '0.15s',
      transitionProperty: 'background-color',
      outlineStyle: 'none',
    },
  },
  cells: {
    style: { paddingLeft: '16px', paddingRight: '16px' },
  },
  pagination: {
    style: {
      borderTop: '1px solid var(--color-border)',
      fontSize: '0.875rem',
      color: 'var(--color-text)',
    },
  },
};

function EmployeeTable({ employees }) {
  const [filterText, setFilterText] = useState('');

  /** Filter rows across all visible string fields based on the search input */
  const filteredRows = useMemo(() => {
    const query = filterText.toLowerCase();
    if (!query) return employees;
    return employees.filter((emp) =>
      Object.values(emp).some((val) =>
        String(val).toLowerCase().includes(query)
      )
    );
  }, [employees, filterText]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <span className={styles.count}>
          {filteredRows.length} employee{filteredRows.length !== 1 ? 's' : ''}
        </span>
        <input
          className={styles.search}
          type="search"
          placeholder="Search employees…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          aria-label="Search employees"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredRows}
        customStyles={customTableStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        highlightOnHover
        noDataComponent={
          <p className={styles.empty}>No employees found.</p>
        }
        defaultSortFieldId={1}
      />
    </div>
  );
}

export default EmployeeTable;
