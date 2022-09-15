import React from 'react';
import ReactDOM from 'react-dom';
import RootLayout from './layouts';
import './styles/index.less';

export default (props) => {
  ReactDOM.render(
    <RootLayout {...props} />,
    document.getElementById('sub-app-container')
  );
};
