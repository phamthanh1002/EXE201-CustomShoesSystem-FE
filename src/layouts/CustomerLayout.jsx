import React from "react";
import AppHeader from "../components/customer/AppHeader";
import AppFooter from "../components/common/AppFooter";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <>
      <AppHeader />

      <main style={{ minHeight: "calc(100vh - 120px)"}}>
        <Outlet />
      </main>

      <AppFooter />
    </>
  );
}
