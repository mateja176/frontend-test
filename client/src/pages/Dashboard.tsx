import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

  const rows = [
    {
      name: 'Frozen yoghurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
  ];

  console.log(prediction);

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
      {prediction ? (
        <Box mt={3}>
          <Box mb={2}>
            <Box mb={1}>
              <Typography variant={'h3'}>Importance per feature</Typography>
            </Box>
            <Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(prediction.featureImportance).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        {Object.values(prediction.featureImportance).map(
                          (value) => (
                            <TableCell key={value}>{value}</TableCell>
                          ),
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box mb={2}>
            <Box mb={1}>
              <Typography variant={'h3'}>Scores</Typography>
            </Box>
            <Box my={2}>
              <Box mb={1}>
                <Typography variant={'h4'}>Overall scores</Typography>
              </Box>
              <Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Object.keys(prediction.metrics.overallScores).map(
                          (key) => (
                            <TableCell key={key}>{key}</TableCell>
                          ),
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          {Object.values(prediction.metrics.overallScores).map(
                            (value) => (
                              <TableCell key={value}>{value}</TableCell>
                            ),
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
            <Box my={2}>
              <Box mb={1}>
                <Typography variant={'h4'}>Confusion Metric</Typography>
              </Box>
              <Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Object.keys(prediction.metrics.confusionMetric).map(
                          (key) => (
                            <TableCell key={key}>{key}</TableCell>
                          ),
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          {Object.values(
                            prediction.metrics.confusionMetric,
                          ).map((value) => (
                            <TableCell key={value}>{value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>
          <Link to={NavItems.upload}>Upload CSV data</Link> to see predictions
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;
