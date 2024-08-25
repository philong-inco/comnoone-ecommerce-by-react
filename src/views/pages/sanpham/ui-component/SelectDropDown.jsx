import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Box, OutlinedInput, InputLabel, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SelectDropdown = ({ list, setListChecked, nameDropDown }) => {
    // SELECT DROPDOWN
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 150,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    const [selectId, setSelectId] = useState([]);
    const [selectName, setSelectName] = useState([]);
    const [selectItemss, setselectItemss] = useState([]);
    // useEffect(() => {
    //     if (selectId) {
    //         console.log('ID: ', selectId)
    //     }
    // }, [selectId]);
    // useEffect(() => {
    //     if (selectName) {
    //         console.log('name: ', selectName)
    //     }
    // }, [selectName]);

    useEffect(() => {
        console.log(selectItemss);
        const ids = selectItemss.map((item) => item.id);
        setListChecked(ids);
        setSelectName(selectItemss.map((item) => item.ten));
    }, [selectItemss]);


    const handleChange = (event) => {
        const { value } = event.target;
        setselectItemss(value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel sx={{  
                    display: 'flex',  
                    alignItems: 'center'  
                }} 
                 id="demo-multiple-chip-label" color='secondary'>{nameDropDown}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    color='secondary'
                    
                    multiple
                    value={selectItemss}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((item) => (
                                <Chip sx={{backgroundColor: '#EDE7F6'}} key={item.id} label={item.ten} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {list.map((element) => (
                        <MenuItem
                            key={element.id}
                            value={element}
                            style={getStyles(element.ten, selectItemss.map(item => item.ten), theme)}
                        >
                            {element.ten}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectDropdown;