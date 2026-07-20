import { Dispatch, SetStateAction } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  Bell,
  ShoppingCart,
  User,
  ChevronDown,
} from "lucide-react";

import { useSettings } from "@/context/SettingsContext";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
};

export function CustomerHeader({
  collapsed,
  setCollapsed,
  setMobileOpen,
}: HeaderProps) {
  const { settings, loading } = useSettings();
  const { customer } = useCustomerAuth();

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-4">

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileOpen(true);
              } else {
                setCollapsed(!collapsed);
              }
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/" className="flex items-center gap-3">

            {settings?.logo ? (
              <img
                src={settings.logo}
                alt={settings.companyName}
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold">
                S
              </div>
            )}

            <div className="hidden md:block">
              <p className="font-semibold">
                {settings?.companyName ?? "Saatvik"}
              </p>
            </div>

          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3 rounded-lg border px-3 py-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium">
                {customer?.name ?? "Customer"}
              </p>

              <p className="text-xs text-muted-foreground">
                Customer
              </p>
            </div>

            <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />

          </div>

        </div>
      </div>
    </header>
  );
}