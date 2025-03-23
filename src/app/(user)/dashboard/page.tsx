"use client";

import React from "react";
import { useGetResourceWithoutParams } from "@/providers/dataProvider";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default function DashboardPage() {
  const { data: dashboardData, isLoading } = useGetResourceWithoutParams(
    "analytics/dashboard"
  );

  if (isLoading) {
    return (
      <ContentLayout title="Tableau de bord">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[180px] w-full" />
          ))}
        </div>
      </ContentLayout>
    );
  }

  return <AdminDashboard data={dashboardData as any} />;
}
