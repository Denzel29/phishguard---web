"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Building2, Users, Target, BarChart3, Mail, LogOut } from "lucide-react";

export default function CompanyDashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2016a9] text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Company Admin</h1>
              <p className="text-xs text-gray-500">Organization Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
              {user.roleName}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h2>
          <p className="mt-1 text-gray-500">Manage your organization&apos;s phishing simulations and team.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashCard
            icon={<Target className="h-6 w-6 text-orange-600" />}
            title="Campaigns"
            description="Create and manage phishing simulation campaigns."
            stat="—"
            statLabel="Active campaigns"
            color="orange"
          />
          <DashCard
            icon={<Users className="h-6 w-6 text-blue-600" />}
            title="Team Members"
            description="Invite employees and manage team access."
            stat="—"
            statLabel="Team members"
            color="blue"
          />
          <DashCard
            icon={<Mail className="h-6 w-6 text-green-600" />}
            title="Scenarios"
            description="Browse and assign phishing scenarios."
            stat="—"
            statLabel="Available scenarios"
            color="green"
          />
          <DashCard
            icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
            title="Reports"
            description="View organization-wide training results."
            stat="—"
            statLabel="Completion rate"
            color="purple"
          />
        </div>
      </div>
    </main>
  );
}

function DashCard({
  icon,
  title,
  description,
  stat,
  statLabel,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  color: string;
}) {
  const bgMap: Record<string, string> = {
    orange: "bg-orange-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
  };

  return (
    <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-2 ${bgMap[color] ?? "bg-gray-100"}`}>
          {icon}
        </div>
        {stat && (
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{stat}</p>
            <p className="text-xs text-gray-500">{statLabel}</p>
          </div>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
