import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { MenuDropdown } from "@/components/site/MenuDropdown";
import {
  User,
  Package,
  MapPin,
  KeyRound,
  Heart,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/corporate", label: "Orders" },
  { to: "/about", label: "Saatviks Story" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const { settings, loading } = useSettings();
  const {
    cartItems,
    open: cartOpen,
    setOpen: setCartOpen,
  } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const {
    customer,
    isAuthenticated,
    logout,
  } = useCustomerAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (loading) return null;



  const light = !scrolled; // sitting over dark burgundy hero at top

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
          ? "backdrop-blur-md bg-[oklch(0.97_0.07_96.58)] border-b border-border shadow-soft"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {settings.logo ? (
            <img
              src={settings.logo}
              alt={settings.companyName}
              className="w-10 h-10 rounded-full object-cover shadow-soft"
            />
          ) : (
            <span
              className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full shadow-soft ${light ? "bg-gold" : "bg-gradient-burgundy"
                }`}
            >
              <span
                className={`font-display text-lg leading-none ${light ? "text-primary" : "text-primary-foreground"
                  }`}
              >
                S
              </span>
            </span>
          )}
          {/* </span> */}
          <span className="flex flex-col leading-none">
            {/* <span className={`font-display text-lg md:text-xl ${ "text-primary"}`}>{SITE.short}</span> */}
            <span className={`text-[10px] md:text-[11px] tracking-[0.28em] uppercase ${"text-muted-foreground"}`}>
              {settings.companyName}
            </span>
            {/* <div className="font-display text-2xl text-[15px] tracking-[0.3em] uppercase text-gold-soft/80">
  
</div> */}
          </span>
        </Link>
<nav className="hidden md:flex items-center gap-8">
  <Link
    to="/"
    className="relative text-sm tracking-wide transition-colors hover:text-primary"
    activeProps={{
      className:
        "text-primary after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-primary",
    }}
  >
    Home
  </Link>

  <MenuDropdown />

  {navLinks.slice(1).map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className="relative text-sm tracking-wide transition-colors hover:text-primary"
      activeProps={{
        className:
          "text-primary after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-primary",
      }}
    >
      {link.label}
    </Link>
  ))}
</nav>
        <div className="hidden md:flex items-center gap-4">

          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm hover:shadow-md transition"
              >
                <User size={18} />
                <span>My Account</span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-white shadow-xl overflow-hidden z-50">
                  <Link
                    to="/account"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/account/orders"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <Package size={18} />
                    Orders
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-sm hover:text-primary"
              >
                Login
              </Link>

              {/* <Link
        to="/auth/register"
        className="text-sm hover:text-primary"
      >
        Register
      </Link> */}
            </>
          )}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center rounded-full p-2 hover:bg-muted transition"
          >
            <ShoppingBag className="h-6 w-6 text-primary" />

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">
                {totalItems}
              </span>
            )}
          </button>
          <Link
            to="/menu"
            search={{
              category: "all",
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[rgb(126,0,62)] text-primary-foreground px-5 py-2.5 text-sm"
          >
            Order Now
          </Link>

        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full ${light ? "bg-gold/20 text-cream border border-gold/40" : "bg-secondary text-primary"}`}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
<div
  className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-cream/95 backdrop-blur transition-transform duration-300 ${
    open ? "translate-x-0" : "-translate-x-full"
  }`}
>
        <div className="h-full overflow-y-auto px-5 py-4 flex flex-col">
<div className="md:hidden flex flex-col gap-2">
  {navLinks.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      onClick={() => setOpen(false)}
      className="py-3"
      activeProps={{
        className: "text-primary font-semibold",
      }}
    >
      {link.label}
    </Link>
  ))}

<MenuDropdown
  mobile
  onNavigate={() => setOpen(false)}
/>
</div>
          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="py-3"
              >
                My Profile
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-left py-3"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                onClick={() => setOpen(false)}
                className="py-3"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                onClick={() => setOpen(false)}
                className="py-3"
              >
                Register
              </Link>
            </>
          )}
          <Link
            to="/menu"
            search={{
              category: "all",
            }}
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
}
