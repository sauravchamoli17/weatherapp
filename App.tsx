import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundaryFallback from './src/components/ErrorBoundaryFallback';
import ErrorBoundary from 'react-native-error-boundary'

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
    </ErrorBoundary>
  );
};

export default App;