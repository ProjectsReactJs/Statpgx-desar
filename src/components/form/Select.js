import { FormControl, InputLabel, Select as MUISelect, MenuItem } from "@mui/material";
import { v4 as uudi } from "uuid";

const Select = ({
    label = '--Please select an option--',
    id = uudi(),
    name = '',
    value = '',
    onChange,
    items = [],
    disabled = false,
    keyExtractor = (item) => item.id,
    textExtractor = (item) => item.name,
}) => {
    const handleChange = (e) => {
        onChange?.(e);
    }

    return (
        <FormControl fullWidth>
            {label && <InputLabel id={id}>{label}</InputLabel>}
            <MUISelect
                labelId={id}
                id={id}
                value={value}
                name={name}
                label={label}
                disabled={disabled}
                onChange={handleChange}
            >
                {items.map(item => (
                    <MenuItem value={keyExtractor(item)} key={keyExtractor(item)}>{textExtractor(item)}</MenuItem>
                ))}
            </MUISelect>
        </FormControl>
    );
}

export default Select;