import { UserService } from '../src/services/userService';
import { Button } from '@mui/material';

export default function Logout() {
  return (
    <Button onClick={() => UserService.logout()}>
      Logout
    </Button>
  );
};