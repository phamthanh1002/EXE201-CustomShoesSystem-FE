import React from 'react';
import AppFooter from '../components/common/AppFooter';
import StaffHeader from '../components/staff/StaffHeader';
import { Outlet } from 'react-router-dom';

export default function CustomerLayout() {
  return (
    <>
      <StaffHeader />

      <main style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Outlet />
      </main>

      <AppFooter />
    </>
  );
}
