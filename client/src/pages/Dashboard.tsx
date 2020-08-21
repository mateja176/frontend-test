import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AppContext } from '../context/context';
import { NavItems } from '../utils/navItems';

const Dashboard: React.FC<RouteComponentProps> = () => {
  const { prediction, input } = React.useContext(AppContext);

  return (
    <Box p={4}>
      <Box>
        <Typography variant={'h2'}>Data</Typography>
        <Box my={3}>
          <TextField
            label={'Target'}
            value={input?.target || 'Not chosen'}
            variant={'outlined'}
            disabled
          />
          {input?.data && (
            <Box my={3} flex={1}>
              <LineChart
                width={1000}
                height={600}
                data={input.data.map(({ index, ...record }) => ({
                  ...record,
                  index: moment(index).format('DD/MM/YYY'),
                }))}
              >
                <Tooltip />
                <XAxis dataKey={'index'} />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey={input.target} stroke="#8884d8" />
              </LineChart>
            </Box>
          )}
        </Box>
      </Box>
      <Typography variant={'h2'}>Prediction</Typography>
      <Box>
        {prediction ? (
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        ) : (
          <Typography>
            <Link to={NavItems.upload}>Upload CSV data</Link> to see predictions
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
