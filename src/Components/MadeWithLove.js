import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const MadeWithLove = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://amrtravels.in">
        Amr Travels
      </Link>
      {' team.'}
    </Typography>
  );
};

export default MadeWithLove;
