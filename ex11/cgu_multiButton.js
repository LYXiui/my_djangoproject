import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const changeText = (event) => {
  console.log(event.target);
};

const MultiButton = () => {
  var output = [];

  output.push(
    <IconButton color="primary" onClick={changeText}>
      <AddShoppingCartIcon />
    </IconButton>
  );

  output.push(
    <IconButton color="primary" onClick={changeText}>
      <DeleteIcon />
    </IconButton>
  );

  output.push(
    <IconButton color="primary" onClick={changeText}>
      <AlarmIcon />
    </IconButton>
  );

  return output;
};

export default MultiButton;