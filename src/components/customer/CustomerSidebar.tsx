import type { Dispatch, SetStateAction } from "react";
import { Link } from "@tanstack/react-router";
import {
  User,
  Package,
  MapPin,
  Heart,
  KeyRound,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
};

export function CustomerSidebar({
  collapsed,
}: SidebarProps) {
  const { logout } = useCustomerAuth();
const navigate = useNavigate();
const handleLogout = async () => {
  await logout();

  toast.success("Logged out successfully");

  navigate({ to: "/" });
};

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      to: "/account",
    },
    {
      title: "My Orders",
      icon: Package,
      to: "/account/orders",
    },
    {
      title: "Addresses",
      icon: MapPin,
      to: "/account/addresses",
    },
    {
      title: "Wishlist",
      icon: Heart,
      to: "/account/wishlist",
    },
    {
      title: "Profile",
      icon: User,
      to: "/account/profile",
    },
    {
      title: "Password",
      icon: KeyRound,
      to: "/account/password",
    },
  ];

  return (
    <aside
      className={`
        fixed
        top-16
        left-0
        bottom-0
        bg-white
        border-r
        shadow-sm
        transition-all
        duration-300
        overflow-y-auto
        hidden
        lg:block
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="p-4">

        <div className="mb-6 px-3">
          {!collapsed && (
            <h2 className="text-xs font-semibold uppercase text-gray-500">
              Customer
            </h2>
          )}
        </div>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
<Link
  key={item.title}
  to={item.to}
  activeOptions={
    item.to === "/account"
      ? { exact: true }
      : undefined
  }
  activeProps={{
    className: "bg-primary text-white",
  }}
  className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-muted"
>
  <Icon size={20} />

  {!collapsed && (
    <span className="text-sm font-medium">
      {item.title}
    </span>
  )}
</Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={20} />

            {!collapsed && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </nav>

      </div>
    </aside>
  );
}