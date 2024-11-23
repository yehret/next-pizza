import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { CartButton } from './cart-button';
import { SearchInput } from './search-input';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href={'/'}>
          <div className="flex items-center gap-4">
            <Image src={'/logo.png'} alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">nowhere is tastier</p>
            </div>
          </div>
        </Link>

        {/* Center Side // Search */}
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Sign In
          </Button>

          <div>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
