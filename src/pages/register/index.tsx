import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Container, FormControl, InputLabel, TextField } from '@mui/material';

import axios from 'axios';
import { UserService } from "../../services/userService";


type RegisterInputs = {
  username: string,
  email?: string | null,
  password: string
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: null,
      password: ''
    }
  });
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const res = await UserService.register(data);
    console.log(res);
  };

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
          Register
        </Button>
      </form>
    </Container>
  );
}