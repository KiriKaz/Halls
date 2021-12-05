import type { NextPage } from 'next';
import Head from 'next/head';

import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta architecto aperiam corrupti, facere laborum animi cupiditate tenetur voluptatem dolore, ducimus sed quidem, totam facilis natus! Eius, quo! Praesentium, hic quaerat?
          Mollitia non voluptas fugit maxime reiciendis sed pariatur sapiente, ullam nobis soluta quasi exercitationem distinctio obcaecati cum aliquid consectetur sequi nam, accusamus autem excepturi explicabo nihil. Quia vitae cupiditate possimus?
        </Typography>
      </Container>
    </div>
  );
};

export default Home;