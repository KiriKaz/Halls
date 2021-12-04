import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Container, FormControl, InputLabel, TextField } from '@mui/material';

type LoginInputs = {
  username: string | null,
  email?: string | null,
  password: string | null,
  passwordVerify: string | null
};

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    mode: 'onBlur',
    defaultValues: {
      username: null,
      email: null,
      password: null,
      passwordVerify: null
    }
  });
  const onSubmit: SubmitHandler<LoginInputs> = data => console.log(data);

  return (
    <Container style={{ backgroundColor: 'gray' }}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormControl variant="outlined">
          <Controller
            name="username"
            control={control}
            render={({ field }) => <TextField {...field} />}
            defaultValue="carcinoGeneticist"
            rules={{ required: true }}
          />
        </FormControl>
        <FormControl variant="outlined">
          <Controller
            name="password"
            control={control}
            render={({ field }) => <TextField {...field} />}
            rules={{ required: true }}
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </Container>
  );
}