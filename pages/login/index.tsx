import React, { useEffect } from "react";
import router from 'next/router';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Container, FormControl, InputLabel, TextField } from '@mui/material';

import { UserService } from '../../src/services/userService';

import axios from 'axios';
import { useAppDispatch } from "../../src/hooks";
import { login } from "../../src/features/authentication/login";


type LoginInputs = {
  username: string,
  email?: string | null,
  password: string,
  passwordVerify: string | null
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: null,
      password: '',
      passwordVerify: null
    }
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    // const loginRes = await UserService.login(data.username, data.password);
    const loginRes = dispatch(login({ username: data.username, password: data.password }));
  };

  useEffect(() => {
    if (localStorage.getItem('sessionToken')) {
      router.push('/');
    }
  }, []);


  return (
    <Container style={{ backgroundColor: 'gray' }}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <TextField
          id="username"
          variant="filled"
          {...register('username', { required: true, maxLength: 20 })}
        />
        <TextField
          id="password"
          type="password"
          variant="filled"
          {...register('password', { required: true })}
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </Container>
  );
}