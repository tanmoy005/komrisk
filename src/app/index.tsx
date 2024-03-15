import React from 'react';
import Workspace from './(pages)';
import { Provider } from 'react-redux';
import store from '../store';
// import store from '../store';

const index = () => {
  return (
    <Workspace />
  );
};

export default index;