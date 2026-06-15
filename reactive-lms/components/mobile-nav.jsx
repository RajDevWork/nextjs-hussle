import React from 'react';
import { cn } from '@/lib/utils';

import { X } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';

const MobileNav = ({items,children}) => {
    return (
        <div>
            {items?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="
                    text-sm
                    font-medium
                    text-slate-700
                    hover:text-blue-600
                  "
                >
                  {item.title}
                </Link>
              ))} 
        </div>
    );
};

export default MobileNav;