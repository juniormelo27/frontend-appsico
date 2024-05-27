import { ForgotPassword, Login, Register } from '@/@types';
import { TypeProfileUpdate } from '@/@types/schema/auth/profile';
import http from '@/services/fetch';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export const useAuthLogin = () =>
  useMutation<
    {
      message: string;
    },
    Error,
    Login
  >({
    mutationKey: ['auth', 'login'],
    mutationFn: async (value) => {
      const response = await signIn('credentials', {
        ...value,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error(response?.error!);
      }

      return {
        message: 'Logado com sucesso',
      };
    },
  });

export const useAuthRegister = () =>
  useMutation<
    {
      message: string;
    },
    Error,
    Register
  >({
    mutationKey: ['auth', 'register'],
    mutationFn: async (value) => {
      const response = await http<{
        message: string;
      }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...value,
          password_confirm: undefined,
        }),
      });

      return response;
    },
  });

export const useAuthForgot = () =>
  useMutation<
    {
      message: string;
    },
    Error,
    ForgotPassword
  >({
    mutationKey: ['auth', 'forgot-password'],
    mutationFn: async (value) => {
      const response = await http<{
        message: string;
      }>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify(value),
      });

      return response;
    },
  });

export const useAuthUpdateProfile = (session: string) =>
  useMutation<
    {
      message: string;
    },
    Error,
    TypeProfileUpdate
  >({
    mutationFn: async (props) => {
      await http<{
        message: string;
      }>('/auth/profile/' + session, {
        method: 'PATCH',
        body: JSON.stringify(props),
      });

      return {
        message: 'alterado com sucesso',
      };
    },
  });

export const useAuthUpdatePassword = (session: string) =>
  useMutation<
    {
      message: string;
    },
    Error,
    {
      password: string;
      newPassword: string;
    }
  >({
    mutationFn: async ({ password, newPassword }) => {
      await http<{
        message: string;
      }>('/auth/password/' + session, {
        method: 'PATCH',
        body: JSON.stringify({
          current: password,
          password: newPassword,
        }),
      });

      return {
        message: 'alterado com sucesso',
      };
    },
  });
