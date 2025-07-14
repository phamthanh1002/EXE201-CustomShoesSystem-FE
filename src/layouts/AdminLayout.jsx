import React from 'react';
import AppFooter from '../components/common/AppFooter';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';

export default function CustomerLayout() {
  return (
    <>
      <AdminHeader />

      <main style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Outlet />
      </main>

      <AppFooter />
    </>
  );
}
