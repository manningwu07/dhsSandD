// pages/admin.tsx
import dynamic from 'next/dynamic';

// Dynamically import AdminPage with SSR disabled
const AdminPage = dynamic(() => import('../admin/adminPage'), { ssr: false });

export default function Admin() {
  return <AdminPage />;
}