import { ReactNode, useState } from "react";
import { CustomerHeader } from "./CustomerHeader";
import { CustomerSidebar } from "./CustomerSidebar";

type Props = {
  children: ReactNode;
};

export function CustomerLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <CustomerHeader
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <CustomerSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main
        className={`
          pt-20
          px-6
          pb-6
          transition-all
          duration-300
          ${collapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        <div className="rounded-xl bg-white shadow-sm border min-h-[calc(100vh-110px)] p-6">
          {children}
        </div>
      </main>
    </div>
  );
}