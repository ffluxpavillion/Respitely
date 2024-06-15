import React from 'react';
import './ComingSoon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';

const ComingSoon = ({ title, message, height = '100%', width = '100%' }) => {
  const containerStyle = {
    height: height,
    width: width,
  };

  return (
    <div className='coming-soon-container' style={containerStyle}>
      <FontAwesomeIcon icon={faTools} size='3x' className='construction-icon' />
      <h1 className='coming-soon__header'>{title}</h1>
      <p className='coming-soon__text'>{message}</p>
    </div>
  );
};

export default ComingSoon;
