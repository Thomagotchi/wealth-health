import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CreateEmployee from './pages/CreateEmployee/CreateEmployee';
import EmployeeList from './pages/EmployeeList/EmployeeList';

/**
 * App — root component that sets up routing for the HRnet application.
 * Routes:
 *   /            → CreateEmployee (form to add a new employee)
 *   /employees   → EmployeeList   (table of all saved employees)
 */
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
