import './index.css';
import Home from '../src/pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// User Routes
import Nuwaraeliya from '../src/pages/Nuwaraeliya';
import Colombo from '../src/pages/Colombo';
import PlanYourTrip from '../src/pages/plan_your_trip';

// Admin Routes
import AdminHotel from '../src/pages/admin_hotel';
import AdminRestaurent from '../src/pages/admin_restaurant';
import AdminGuides from '../src/pages/admin_guide';
import AdminActivities from '../src/pages/admin_activities';

// Sidebar Component
import Sidebar from './pages/Sidebar';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes with Sidebar */}
        <Route path="/admin_hotel" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-grow ml-64 p-6">
              <AdminHotel />
            </div>
          </div>
        } />
        <Route path="/admin_restaurent" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-grow ml-64 p-6">
              <AdminRestaurent />
            </div>
          </div>
        } />
        <Route path="/admin_guides" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-grow ml-64 p-6">
              <AdminGuides />
            </div>
          </div>
        } />
        <Route path="/admin_activities" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-grow ml-64 p-6">
              <AdminActivities />
            </div>
          </div>
        } />

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/nuwaraeliya" element={<Nuwaraeliya />} />
        <Route path="/colombo" element={<Colombo />} />
        <Route path="/plan_your_trip" element={<PlanYourTrip />} />
      </Routes>
    </Router>
  );
};

export default App;
