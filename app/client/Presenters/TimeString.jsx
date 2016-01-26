import * as React from 'react';
import moment from 'moment';

const TimeString = ({time, ...props}) => {
  const ts = moment(new Date(time));
  return <span title={time}>{ts.fromNow()}</span>;
};
TimeString.propTypes = {
  time: React.PropTypes.string.isRequired, // ISO Date
};

export default TimeString;
