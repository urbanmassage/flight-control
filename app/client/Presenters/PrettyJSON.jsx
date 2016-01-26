import * as React from 'react';
import Colors from 'material-ui/lib/styles/colors';

const PrettyJSON = ({data}) => {
  let color = 'black';
  switch (typeof data) {
    case 'string':
      break;
    case 'number':
      color = Colors.blue700;
      break;
    case 'boolean':
      color = Colors.cyan700;
      break;
    case 'object':
      color = Colors.cyan700;
      if (data == null) break;

      if (Array.isArray(data)) {
        return <ul>{data.map((item, index) => <li key={index}><PrettyJSON data={item} /></li>)}</ul>;
      }
      color = Colors.yellow700;
      return (<div>{Object.keys(data).map(key => {
        return <div key={key} style={{padding: '0 0 0 20px'}}>  <strong style={{color}}>{key}:</strong> <PrettyJSON data={data[key]} /></div>;
      })}</div>);
      break;
  }

  let string = data+'';
  if (string.indexOf('\n') > -1) {
    return <div style={{padding: '0 0 0 20px', color}}>{string}</div>;
  }
  return <span style={{color}}>{string}</span>;
};
PrettyJSON.propTypes = {
  data: React.PropTypes.any,
};

export default PrettyJSON;
