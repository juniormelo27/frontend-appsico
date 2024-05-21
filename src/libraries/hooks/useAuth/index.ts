import { ForgotPassword, Login, Register } from '@/@types';
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
      const response = await http('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...value,
          password_confirm: undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message, {
          cause: data.description,
        });
      }

      return data;
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
      const response = await http('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message, {
          cause: data.description,
        });
      }

      return data;
    },
  });
