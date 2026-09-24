"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Shield, Users, Building2, BarChart3, Settings, LogOut, Menu, X } from "lucide-react";

export default function PlatformDashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Platform Admin</h1>
              <p className="text-xs text-gray-500">PhishGuard Control Center</p>
            </div>
          </div>
          {/* Desktop User Menu */}
          <div className="hidden items-center gap-4 md:flex">
            <span className="text-sm text-gray-600">{user.email}</span>
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-gray-900">{user.email}</span>
              <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                {user.roleName}
              </span>
              <button
                onClick={handleLogout}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h2>
          <p className="mt-1 text-gray-500">Manage organizations, users, and platform settings.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashCard
            icon={<Building2 className="h-6 w-6 text-blue-600" />}
            title="Organizations"
            description="Onboard and manage companies on the platform."
            stat="—"
            statLabel="Total organizations"
            color="blue"
          />
          <DashCard
            icon={<Users className="h-6 w-6 text-green-600" />}
            title="All Users"
            description="View and manage all platform users."
            stat="—"
            statLabel="Total users"
            color="green"
          />
          <DashCard
            icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
            title="Platform Reports"
            description="System-wide analytics and usage reports."
            stat="—"
            statLabel="Active campaigns"
            color="purple"
          />
          <DashCard
            icon={<Shield className="h-6 w-6 text-red-600" />}
            title="Roles & Permissions"
            description="Manage platform roles and access control."
            stat="—"
            statLabel="Defined roles"
            color="red"
          />
          <DashCard
            icon={<Settings className="h-6 w-6 text-gray-600" />}
            title="Platform Settings"
            description="Configure global platform settings."
            stat=""
            statLabel=""
            color="gray"
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
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    red: "bg-red-50",
    gray: "bg-gray-100",
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
