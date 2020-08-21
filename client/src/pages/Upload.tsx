import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectProps } from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import csv from 'csvtojson';
import { FormikConfig, FormikErrors, useFormik } from 'formik';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { AppContext } from '../context/context';
import { GenericInput, IRecord } from '../models/input';
import { predict } from '../services/predict';
import { NavItems } from '../utils/navItems';
import { transformData } from '../utils/utils';

const initialValues: GenericInput = {
  data: [],
  target: '',
};

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 200,
  },
}));

const dropStyle: React.CSSProperties = {
  cursor: 'pointer',
  marginBottom: 20,
  height: 200,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const validationSchema = yup
  .object()
  .required()
  .shape<GenericInput>({
    data: yup
      .array()
      .required()
      .of(
        yup.object().required().shape<IRecord>({
          index: yup.number().required(),
        }),
      )
      .min(1),
    target: yup.string().required(),
  });

const Upload: React.FC<RouteComponentProps> = () => {
  const history = useHistory();

  const { setPrediction, setInput } = React.useContext(AppContext);

  const [submissionError, setSubmissionError] = React.useState<Error | null>(
    null,
  );

  const onSubmit: FormikConfig<GenericInput>['onSubmit'] = React.useCallback(
    (values) => {
      setInput(values);

      return predict(values)
        .then((prediction) => {
          setPrediction(prediction);

          history.push(NavItems.dashboard);
        })
        .catch((error: Error) => {
          setSubmissionError(error);
        });
    },
    [setPrediction, setInput],
  );

  const {
    values,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const [fileName, setFiledName] = React.useState('No file chosen');
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
    onDrop: ([file]) => {
      setFiledName(file.name);

      const reader = new FileReader();

      reader.readAsText(file);

      new Promise<string>((resolve) => {
        reader.onload = () => {
          resolve(String(reader.result));
        };
      }).then((csvData) => {
        csv()
          .fromString(csvData)
          .then((json) => {
            const data = transformData(json);
            setFieldValue('data', data);
          });
      });
    },
    disabled: isSubmitting,
  });

  const handleSelectTarget: SelectProps['onChange'] = React.useCallback(
    ({ target: { value } }) => {
      if (value) {
        setFieldValue('target', value);
      }
    },
    [setFieldValue],
  );

  const classes = useStyles();

  return (
    <Box p={4}>
      <Box mb={3}>
        <Typography variant={'h2'}>Upload CSV file</Typography>
      </Box>
      <Collapse in={!!submissionError}>
        <Alert severity={'error'}>{submissionError}</Alert>
      </Collapse>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input {...getInputProps()} />
        <Box width={'100%'}>
          <Card {...getRootProps()} style={dropStyle}>
            <Button variant={'contained'} color={'primary'}>
              Drop or select CSV file
            </Button>
          </Card>
          <Box>
            {errors.data ? (
              typeof errors.data === 'string' ? (
                <FormHelperText error>{errors.data}</FormHelperText>
              ) : (
                (errors.data as (string | FormikErrors<IRecord>)[]).map(
                  (error) => {
                    if (typeof error === 'string') {
                      return (
                        <FormHelperText key={error} error>
                          {error}
                        </FormHelperText>
                      );
                    } else {
                      return (
                        <FormHelperText key={error.index} error>
                          {error.index}
                        </FormHelperText>
                      );
                    }
                  },
                )
              )
            ) : (
              <FormHelperText>{fileName}</FormHelperText>
            )}
          </Box>
        </Box>
        <Box mb={3}>
          <FormControl className={classes.formControl}>
            <InputLabel>Target</InputLabel>
            <Select value={values.target} onChange={handleSelectTarget}>
              {values.data[0] ? (
                Object.keys(values.data[0]).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>First choose CSV file</MenuItem>
              )}
            </Select>
          </FormControl>
          <Box
            visibility={
              !!touched.target && errors.target ? 'visible' : 'hidden'
            }
          >
            <FormHelperText error>
              {errors.target || 'Placeholder'}
            </FormHelperText>
          </Box>
        </Box>
        <Button
          disabled={isSubmitting}
          type={'submit'}
          variant={'contained'}
          color={'primary'}
        >
          Predict
        </Button>
      </form>
    </Box>
  );
};

export default Upload;
