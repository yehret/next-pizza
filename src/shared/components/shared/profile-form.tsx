'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TFormRegisterValues, formRegisterSchema } from './modals/auth-modal/forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { Button } from '../ui';
import { FormInput } from './form-components';
import { updateUserInfo } from '@/app/actions';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Data updated 📝', {
        icon: '✅',
      });
    } catch (error) {
      console.log(error);
      return toast.error('An error has occured while updating data', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  // TODO: ADD ORDER HISTORY
  // TODO: ADD PASSWORDS TO BE OPTIONAL

  return (
    <Container className="my-10">
      <Title text={`Personal Information | #${data.id}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full Name" required />

          <FormInput type="password" name="password" label="New password" required />
          <FormInput type="password" name="confirmPassword" label="Repeat password" required />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button">
            Sign Out
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
