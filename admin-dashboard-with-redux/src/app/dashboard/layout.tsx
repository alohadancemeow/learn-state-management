import AdminLayout from '@/components/layout/AdminLayout';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
