import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { Button } from '@/shared/components/ui';
import { FormInput } from '../../../form-components';
import { Title } from '../../../title';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

interface Props {
   onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
   const form = useForm<TFormLoginValues>({
      resolver: zodResolver(formLoginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   const onSubmit = async (data: TFormLoginValues) => {
      try {
         const res = await signIn('credentials', {
            ...data,
            redirect: false
         })

         if(!res?.ok) throw Error()

         toast.success('Succesfully signed in', {
            icon: '✅',
         });
      
         onClose?.();
      } catch (error) {
         console.error('Error [LOGIN]', error);
         toast.error('Some error has occured, try again', {
           icon: '❌',
         });
      }
   }

   return (
      <FormProvider {...form} >
         <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center">
               <div className="mr-2">
                  <Title text="Sign In" size="md" className="font-bold" />
                  <p className="text-gray-400">Enter your email to sign in into your account</p>
               </div>
               <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
            </div>

            <FormInput name="email" label="E-Mail" required />
            <FormInput name="password" label="Password" type="password" required />

            <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
               Sign In
            </Button>
         </form>
      </FormProvider>
   )
}