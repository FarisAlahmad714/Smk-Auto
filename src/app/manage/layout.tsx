// src/app/manage/layout.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect('/auth/login');
  }

  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}