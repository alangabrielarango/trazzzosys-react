import { Box, Typography } from '@mui/material';
import { FC } from 'react';

export const Home: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        Bienvenido a Trazzo S.A
      </Typography>
    </Box>
  );
};
