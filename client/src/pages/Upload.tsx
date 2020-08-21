import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Upload: React.FC<RouteComponentProps> = () => {
  const { handleSubmit } = useFormik({
    initialValues: {},
    onSubmit: console.log,
  });

  return (
    <Box>
      <Typography variant={'h2'}>Upload CSV file</Typography>
      <form onSubmit={handleSubmit}>
        <input type={'file'} accept=".csv" />
      </form>
    </Box>
  );
};

export default Upload;
