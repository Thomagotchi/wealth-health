import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store for managing employee records.
 * Persists data to localStorage automatically via the `persist` middleware.
 *
 * Usage:
 *   const { employees, addEmployee } = useEmployeeStore();
 */
const useEmployeeStore = create(
  persist(
    (set) => ({
      /** Array of all employee objects */
      employees: [],

      /**
       * Adds a new employee to the store.
       * @param {Object} employee - The employee data object to add
       */
      addEmployee: (employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
    }),
    {
      name: 'employees', // localStorage key — matches the key used by the original jQuery app
    }
  )
);

export default useEmployeeStore;
