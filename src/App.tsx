import React from 'react';
import {Provider} from 'react-redux';
import {RouterNavigation} from '@navigation';
import {store} from '@redux';

const App = () => {
  return (
    <Provider store={store}>
      <RouterNavigation />
    </Provider>
  );
};

export default App;
