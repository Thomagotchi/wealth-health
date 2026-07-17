import { useState } from 'react';
import { format } from 'date-fns';
import DatePickerField from '../../components/DatePickerField/DatePickerField';
import SelectField from '../../components/SelectField/SelectField';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import useEmployeeStore from '../../store/useEmployeeStore';
import { states, departments } from '../../data/states';
import styles from './CreateEmployee.module.scss';

/**
 * CreateEmployee page — form for adding a new employee record.
 * Mirrors the original index.html functionality with full React state management.
 *
 * State:
 *   All form fields are controlled via local useState.
 *   On submit, the employee object is pushed into the Zustand store (and persisted to localStorage).
 */

/** Convert the states array to react-select option format */
const stateOptions = states.map((s) => ({ label: s.name, value: s.abbreviation }));

/** Initial blank form state */
const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  startDate: null,
  street: '',
  city: '',
  state: null,
  zipCode: '',
  department: null,
};

function CreateEmployee() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addEmployee = useEmployeeStore((s) => s.addEmployee);

  /** Generic handler for plain text inputs */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** Handler for react-datepicker date fields */
  const handleDate = (field) => (date) => {
    setForm((prev) => ({ ...prev, [field]: date }));
  };

  /** Handler for react-select dropdown fields */
  const handleSelect = (field) => (option) => {
    setForm((prev) => ({ ...prev, [field]: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = {
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: form.dateOfBirth ? format(form.dateOfBirth, 'MM/dd/yyyy') : '',
      startDate: form.startDate ? format(form.startDate, 'MM/dd/yyyy') : '',
      street: form.street,
      city: form.city,
      state: form.state?.value ?? '',
      zipCode: form.zipCode,
      department: form.department?.value ?? '',
    };

    addEmployee(employee);
    setForm(EMPTY_FORM);
    setIsModalOpen(true);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Create Employee</h1>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* ── Personal Information ─────────────────────────────── */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Personal Information</h2>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="first-name" className={styles.label}>First Name</label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    className={styles.input}
                    value={form.firstName}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="last-name" className={styles.label}>Last Name</label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    className={styles.input}
                    value={form.lastName}
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  {/* DatePickerField replaces the xdsoft jQuery DateTime Picker */}
                  <DatePickerField
                    id="date-of-birth"
                    label="Date of Birth"
                    value={form.dateOfBirth}
                    onChange={handleDate('dateOfBirth')}
                    maxDate={new Date()}
                  />
                </div>

                <div className={styles.field}>
                  <DatePickerField
                    id="start-date"
                    label="Start Date"
                    value={form.startDate}
                    onChange={handleDate('startDate')}
                  />
                </div>
              </div>
            </section>

            {/* ── Address ──────────────────────────────────────────── */}
            <fieldset className={styles.section}>
              <legend className={styles.sectionTitle}>Address</legend>

              <div className={styles.field}>
                <label htmlFor="street" className={styles.label}>Street</label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  className={styles.input}
                  value={form.street}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="city" className={styles.label}>City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className={styles.input}
                    value={form.city}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className={styles.field}>
                  {/* SelectField replaces the jQuery UI .selectmenu() plugin */}
                  <SelectField
                    id="state"
                    label="State"
                    options={stateOptions}
                    value={form.state}
                    onChange={handleSelect('state')}
                    placeholder="Select a state…"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="zip-code" className={styles.label}>Zip Code</label>
                  <input
                    id="zip-code"
                    name="zipCode"
                    type="number"
                    className={styles.input}
                    value={form.zipCode}
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>
            </fieldset>

            {/* ── Department ───────────────────────────────────────── */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Department</h2>
              <div className={styles.field}>
                <SelectField
                  id="department"
                  label="Department"
                  options={departments}
                  value={form.department}
                  onChange={handleSelect('department')}
                  placeholder="Select a department…"
                />
              </div>
            </section>

            <button type="submit" className={styles.saveBtn}>
              Save Employee
            </button>
          </form>
        </div>
      </div>

      {/* ConfirmModal replaces the jQuery Modal plugin */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Employee Created"
      >
        <p>The employee record has been saved successfully. 🎉</p>
      </ConfirmModal>
    </main>
  );
}

export default CreateEmployee;
