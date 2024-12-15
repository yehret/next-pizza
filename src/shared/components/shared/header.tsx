'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { CartButton } from './cart-button';
import { SearchInput } from './search-input';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession, signIn } from 'next-auth/react';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

   const { data: session } = useSession()
   const searchParams = useSearchParams();
   // const router = useRouter();
   
   console.log(session);
   

   React.useEffect(() => {
      let toastMessage = '';

      if (searchParams.has('paid')) {
        toastMessage = 'Order successfully paid. Information has been sent to email.';
      }
  
      if (searchParams.has('verified')) {
        toastMessage = 'Email succenfully confirmed!';
      }
  
      if (toastMessage) {
        setTimeout(() => {
         //  router.replace('/');
          toast.success(toastMessage, {
            duration: 3000,
          });
        }, 1000);
      }
   }, [])

  return (
    <header className={cn('border-b', className)}>
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
        {hasSearch && <div className="mx-10 flex-1">
          <SearchInput />
        </div>}

        {/* Right Side */}
        <div className="flex items-center gap-3">
         <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

         {/* TODO: ADD SESSION LOADING SKELETON */}
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <div>
            <CartButton />
          </div>}
        </div>
      </Container>
    </header>
  );
};
