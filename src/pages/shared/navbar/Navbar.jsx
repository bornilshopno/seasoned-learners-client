// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import {
    Menu,
    ShoppingCart,
    Home,
    BookOpen,
    Store,
    Info,
    Phone,
    Sun,
    Moon,
    LogIn,
    LogOut,
    User,
} from "lucide-react";

import NavLinks from "./NavLinks";
import useAuth from "@/hooks/useAuth";
import logo from "../../../assets/sl-logo.png"



export default function Navbar() {
  const {user,userLogOut}=useAuth()
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const location = useLocation();
    const cartCount = 3; // replace with real cart count later

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className=" mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold ">
                        <img src={logo} className="h-12 w-12 rounded-full border-2 border-primary "/>
                        <span className="hidden sm:block">Seasoned Learners</span>
                    </Link>
                </div>

                <div className="">
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLinks isActive={location.pathname} />
                    </nav>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Cart */}
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>

                    {/* Theme Toggle */}
                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    )}

                    {/* User Menu */}
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="rounded-full p-0">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.photoURL || ""} />
                                        <AvatarFallback>{user.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{user.displayName || "User"}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" /> Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={userLogOut} className="text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild variant="default">
                            <Link to="/login">
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Link>
                        </Button>
                    )}

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <div className="flex flex-col gap-8 pt-6">
                                <Link to="/" className="flex items-center gap-2 font-bold">
                                    <Store className="h-8 w-8 text-primary" />
                                    YourStore
                                </Link>

                                <nav className="flex flex-col gap-2">
                                    <NavLinks isActive={location.pathname} />
                                </nav>

                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    >
                                        {theme === "dark" ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
                                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                                    </Button>

                                    {user ? (
                                        <Button variant="destructive" onClick={userLogOut} className="w-full">
                                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                                        </Button>
                                    ) : (
                                        <Button asChild className="w-full">
                                            <Link to="/login">
                                                <LogIn className="mr-2 h-4 w-4" /> Sign In
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}