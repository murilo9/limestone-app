import React from "react";
import { Outlet } from "react-router-dom";
import SystemHeader from "../components/SystemHeader";

export default function SystemPage() {
  return (
    <>
      <SystemHeader />
      <Outlet />
    </>
  );
}
