import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerField.module.scss';

/**
 * DatePickerField — a labeled date-picker input wrapping `react-datepicker`.
 * Replaces the jQuery xdsoft DateTime Picker plugin.
 *
 * Props:
 *   @prop {string}   id            — unique id linking the <label> to the input (required)
 *   @prop {string}   label         — visible label text shown above the input
 *   @prop {Date|null} value        — the currently selected date (controlled)
 *   @prop {Function} onChange      — callback receiving the new Date when the user picks one
 *   @prop {string}   [placeholder] — placeholder text shown when no date is selected
 *   @prop {Date}     [maxDate]     — optional upper bound; prevents picking dates after this
 *   @prop {Date}     [minDate]     — optional lower bound; prevents picking dates before this
 *
 * Usage:
 *   <DatePickerField
 *     id="date-of-birth"
 *     label="Date of Birth"
 *     value={dateOfBirth}
 *     onChange={(date) => setDateOfBirth(date)}
 *     maxDate={new Date()}
 *   />
 */
function DatePickerField({
  id,
  label,
  value,
  onChange,
  placeholder = 'MM/DD/YYYY',
  maxDate,
  minDate,
}) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <ReactDatePicker
        id={id}
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat="MM/dd/yyyy"
        maxDate={maxDate}
        minDate={minDate}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        autoComplete="off"
      />
    </div>
  );
}

export default DatePickerField;
