import React from 'react';
import { Alert as AntdAlert } from 'antd';

const Alert = ({ message, success }) => {
  if (!message) return null;

  return (
    <AntdAlert
      message={message}
      type={success ? 'success' : 'error'}
      showIcon
    />
  );
};

export default Alert;