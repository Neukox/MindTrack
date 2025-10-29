import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}