import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/RootReducer';
import Workspace from './(pages)';

// import store from '../store';
const store = configureStore({
  reducer: rootReducer,
});

const index = () => (
  <Workspace />
);


AppRegistry.registerComponent('komrisk', () => index);