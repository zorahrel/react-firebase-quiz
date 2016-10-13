import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './dot.scss';

let Dot = (props) => {
  const dotClasses = classNames.bind(styles)(
    props.className,
    `${props.className}--${props.color}`
  );
  
  return (
    <div className={dotClasses}>{props.children}</div>
  );
};

Dot.propTypes = {
  className: PropTypes.string,
  border: PropTypes.string,
  color: PropTypes.oneOf(['red', 'green', 'yellow']),
};

Dot.defaultProps = {
  className: 'dot',
  color: 'green',
};

export default Dot;
