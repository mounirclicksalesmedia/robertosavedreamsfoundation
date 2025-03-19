'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  isSubItem?: boolean;
  onClick?: () => void;
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  subItems?: {
    href: string;
    text: string;
  }[];
}

// SidebarLink component
const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, text, isActive, isSubItem = false, onClick }) => {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
        isActive
          ? 'bg-[#1D942C] text-white'
          : isSubItem
          ? 'text-gray-700 hover:bg-gray-100'
          : 'text-gray-700 hover:bg-gray-100',
        isSubItem && 'pl-10 text-sm'
      )}
      onClick={onClick}
    >
      {!isSubItem && <div className="w-5 h-5">{icon}</div>}
      <span>{text}</span>
    </Link>
  );
};

// Dashboard Layout
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    website: true, // Default expanded
  });

  // Sidebar items with their sub-items
  const sidebarItems: SidebarItemProps[] = [
    {
      href: '/dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      text: 'Dashboard',
    },
    {
      href: '/dashboard/loanapplications',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      text: 'Loans',
    },
    {
      href: '/dashboard/contact',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      text: 'Contact',
    },
    {
      href: '/dashboard/webiste',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      text: 'Website',
      subItems: [
        { href: '/dashboard/webiste/home', text: 'Home' },
        { href: '/dashboard/webiste/about', text: 'About' },
        { href: '/dashboard/webiste/programs', text: 'Programs' },
        { href: '/dashboard/webiste/gallery', text: 'Gallery' },
        { href: '/dashboard/webiste/get-involved', text: 'Get Involved' },
        { href: '/dashboard/webiste/successstories', text: 'Success Stories' },
        { href: '/dashboard/webiste/grant', text: 'Grants' },
        { href: '/dashboard/webiste/donate', text: 'Donate' },
      ],
    },
    {
      href: '/dashboard/settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      text: 'Settings',
    },
  ];

  // Toggle expanded state for sidebar items with sub-items
  const toggleExpanded = (itemText: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemText.toLowerCase()]: !prev[itemText.toLowerCase()],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-5 border-b border-gray-200 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#1D942C] flex items-center justify-center text-white font-bold text-lg">
            R
          </div>
          <h1 className="text-xl font-bold text-gray-900">Roberto</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isItemActive = item.href === pathname || pathname.startsWith(item.href + '/');
            const isExpanded = expandedItems[item.text.toLowerCase()];

            return (
              <div key={item.href} className="space-y-1">
                {/* Main item */}
                {item.subItems ? (
                  <button
                    onClick={() => toggleExpanded(item.text)}
                    className={clsx(
                      'w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors',
                      isItemActive && !pathname.includes('/webiste/') ? 'bg-[#1D942C] text-white' : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5">{item.icon}</div>
                      <span>{item.text}</span>
                    </div>
                    <svg
                      className={clsx(
                        'w-4 h-4 transition-transform',
                        isExpanded ? 'transform rotate-180' : ''
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <SidebarLink
                    href={item.href}
                    icon={item.icon}
                    text={item.text}
                    isActive={isItemActive}
                  />
                )}

                {/* Sub items */}
                {item.subItems && isExpanded && (
                  <div className="mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <SidebarLink
                        key={subItem.href}
                        href={subItem.href}
                        icon={null}
                        text={subItem.text}
                        isActive={subItem.href === pathname}
                        isSubItem
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
} 