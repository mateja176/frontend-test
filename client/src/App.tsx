import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppContext, IAppContext, initialAppContext } from './context/context';
import Layout from './Layout';
import Routes from './Routes';

function App() {
  const [prediction, setPrediction] = React.useState<IAppContext['prediction']>(
    initialAppContext.prediction,
  );
  const [input, setInput] = React.useState<IAppContext['input']>(
    initialAppContext.input,
  );

  const value: IAppContext = React.useMemo(
    () => ({ prediction, setPrediction, input, setInput }),
    [prediction, input],
  );

  return (
    <AppContext.Provider value={value}>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default hot(module)(App);
