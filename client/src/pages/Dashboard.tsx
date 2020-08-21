import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '../context/context';

const Dashboard: React.FC<RouteComponentProps> = () => {
  const { prediction } = React.useContext(AppContext);

  return (
    <Box>
      <Typography variant={'h2'}>Prediction</Typography>
      <Box>
        <pre>{JSON.stringify(prediction)}</pre>
      </Box>
    </Box>
  );
};

export default Dashboard;
