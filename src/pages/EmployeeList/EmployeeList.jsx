import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import useEmployeeStore from '../../store/useEmployeeStore';
import { Link } from 'react-router-dom';
import styles from './EmployeeList.module.scss';

/**
 * EmployeeList page — displays all saved employees in a searchable, sortable table.
 * Reads from the Zustand store (persisted to localStorage).
 */
function EmployeeList() {
  const employees = useEmployeeStore((s) => s.employees);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.heading}>Current Employees</h1>
            <p className={styles.subheading}>
              {employees.length} employee{employees.length !== 1 ? 's' : ''} on record
            </p>
          </div>
          <Link to="/" className={styles.addBtn}>
            + Add Employee
          </Link>
        </div>

        <EmployeeTable employees={employees} />
      </div>
    </main>
  );
}

export default EmployeeList;
