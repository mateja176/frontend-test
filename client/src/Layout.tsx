import { Box } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Dashboard from '@material-ui/icons/Dashboard';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export enum NavItems {
  dashboard = '/dashboard',
  upload = '/upload',
}

const Layout: React.FC = ({ children }) => {
  const history = useHistory();

  const location = useLocation();

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<{}>, value: NavItems) => history.push(value),
    [history],
  );

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'}>
      <Box flex={1}>{children}</Box>
      <BottomNavigation
        value={location.pathname}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction
          value={NavItems.dashboard}
          label="Dashboard"
          icon={<Dashboard />}
        />
        <BottomNavigationAction
          value={NavItems.upload}
          label="Upload"
          icon={<CloudUpload />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
