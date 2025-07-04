"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {ThemeToggle} from "@/components/ui/themeToggle";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Function to determine if link is active
    const isActive = (path: string) => {
        return pathname === path;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                            Occulta
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link
                            href="/"
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                isActive("/")
                                    ? "border-indigo-500 text-gray-900 dark:text-white"
                                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/encode"
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                isActive("/encode")
                                    ? "border-indigo-500 text-gray-900 dark:text-white"
                                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white"
                            }`}
                        >
                            Encode
                        </Link>
                        <Link
                            href="/decode"
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                isActive("/decode")
                                    ? "border-indigo-500 text-gray-900 dark:text-white"
                                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white"
                            }`}
                        >
                            Decode
                        </Link>
                        <Link
                            href="/about"
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                isActive("/about")
                                    ? "border-indigo-500 text-gray-900 dark:text-white"
                                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white"
                            }`}
                        >
                            About
                        </Link>
                        <ThemeToggle />
                    </nav>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false"
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div 
                className={`sm:hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                            isActive("/")
                                ? "bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                                : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/encode"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                            isActive("/encode")
                                ? "bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                                : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white"
                        }`}
                    >
                        Encode
                    </Link>
                    <Link
                        href="/decode"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                            isActive("/decode")
                                ? "bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                                : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white"
                        }`}
                    >
                        Decode
                    </Link>
                    <Link
                        href="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                            isActive("/about")
                                ? "bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                                : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white"
                        }`}
                    >
                        About
                    </Link>
                    <div className="px-3 py-2">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}