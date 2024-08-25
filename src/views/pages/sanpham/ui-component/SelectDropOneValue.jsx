import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
const SelectDropOneValue = ({list, setValueSelect, name}) => {
  const [value, setValue] = useState({});

  useEffect(() => {
    setValueSelect(value.id);
    console.log(value)
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl required sx={{ m: 1, width: '23.4%' }}>
      <InputLabel id="demo-simple-select-required-label" color='secondary'>{name}</InputLabel>
      <Select
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        color='secondary'
        value={value}
        label={name}
        onChange={handleChange}
        sx={{minHeight: '62.9px'}}
        renderValue={(item) => Object.keys(item).length > 0 ?
            <Chip sx={{backgroundColor: '#EDE7F6'}} key={item.id} label={item.ten}></Chip>
            : null
        }
      >
        {list.map((item) => (
          <MenuItem key={item.id} value={item}>
            {item.ten}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropOneValue;
