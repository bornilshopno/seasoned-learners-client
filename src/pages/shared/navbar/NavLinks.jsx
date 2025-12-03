import { BookOpen, Home, Info, Phone, Store } from "lucide-react";
import { Link } from "react-router";

export default function NavLinks({ isActive }) {

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Resources", href: "/resources", icon: BookOpen },
        { name: "Shop", href: "/shop", icon: Store },
        { name: "About Us", href: "/about-us", icon: Info },
        { name: "Contact Us", href: "/contact", icon: Phone },
    ];
    return (
    <div className="flex items-center gap-10 ">
    {navItems.map((item) => {
      const Icon = item.icon;
      const active = isActive === item.href;

      return (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      );
    })}
  </div>
    );
}