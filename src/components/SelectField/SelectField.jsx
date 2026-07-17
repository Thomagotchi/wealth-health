import ReactSelect from 'react-select';
import styles from './SelectField.module.scss';

/**
 * SelectField — a labeled, searchable dropdown built on top of `react-select`.
 * Replaces the jQuery UI `.selectmenu()` plugin.
 *
 * Props:
 *   @prop {string}   id         — unique id linking the <label> to the control (required)
 *   @prop {string}   label      — visible label text shown above the dropdown
 *   @prop {Array}    options    — array of option objects: [{ label: string, value: string }]
 *   @prop {Object|null} value   — the currently selected option object (controlled)
 *   @prop {Function} onChange   — callback receiving the selected option object
 *   @prop {string}   [placeholder] — hint text shown when nothing is selected
 *
 * Usage:
 *   <SelectField
 *     id="department"
 *     label="Department"
 *     options={[{ label: 'Engineering', value: 'Engineering' }]}
 *     value={selectedDept}
 *     onChange={(opt) => setSelectedDept(opt)}
 *   />
 */
function SelectField({ id, label, options, value, onChange, placeholder = 'Select…' }) {
  /** react-select custom styles that align with the design system tokens */
  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? 'var(--color-primary)' : 'var(--color-border)',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(29, 78, 137, 0.12)' : 'none',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--font-size-base)',
      minHeight: '38px',
      '&:hover': { borderColor: 'var(--color-primary-light)' },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'var(--color-primary)'
        : state.isFocused
        ? 'rgba(29, 78, 137, 0.08)'
        : 'transparent',
      color: state.isSelected ? '#fff' : 'var(--color-text)',
      fontSize: 'var(--font-size-base)',
      cursor: 'pointer',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--color-text-light)',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--color-text)',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      zIndex: 10,
    }),
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <ReactSelect
        inputId={id}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        styles={customStyles}
        isClearable={false}
        isSearchable
      />
    </div>
  );
}

export default SelectField;
