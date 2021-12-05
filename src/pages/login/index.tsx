import React, { useEffect } from "react";
import router from 'next/router';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Container, Grid, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../features/authentication/login";


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
  const profile = useAppSelector(state => state.authentication);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    dispatch(login({ username: data.username, password: data.password }));
  };

  useEffect(() => {
    if (profile.token || profile.username) router.push('/');
  }, [profile]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Container style={{ backgroundColor: 'gray', marginTop: 32 }} maxWidth='xs'>
        <Grid container direction='column' spacing={4} justifyContent='space-around' height={300}>
          <Grid item>
            <TextField
              id="username"
              variant="filled"
              fullWidth
              {...register('username', { required: true, maxLength: 20 })}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              type="password"
              variant="filled"
              fullWidth
              {...register('password', { required: true })}
            />
          </Grid>
          <Grid item>
            <Button fullWidth type="submit" variant="contained">Login</Button>
          </Grid>
        </Grid>
      </Container >
    </form>
  );
}