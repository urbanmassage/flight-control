import * as React from 'react';

const DurationString = ({duration, ...props}) => {
  let time = duration;
  if (time > 60000) {
    time = (time / 60000).toFixed(1) + 'm';
  } else if (time > 1000) {
    time = (time / 1000).toFixed(1) + 's';
  } else {
    time = time + 'ms';
  }

  return <span {...props}>{time}</span>;
};
DurationString.propTypes = {
  duration: React.PropTypes.number.isRequired,
};

export default DurationString;
