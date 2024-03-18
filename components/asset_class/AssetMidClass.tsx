import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useAssetClass } from "@/hooks/asset_class/useAssetClass";
import { ChangeEvent } from 'react';

interface mid_class_name {
  inputValue?: string;
  name: string;
}

interface AssetMidClassProps {
  row_id: number;
  row_value: string;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const filter = createFilterOptions<mid_class_name>();

export default function AssetMidClass(props: AssetMidClassProps) {
  // custom hook 사용
  const { handleDataChange, handleDataBlur } = useAssetClass();
  const { row_id, row_value } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly mid_class_name[]>([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState<mid_class_name | null>(null);

  React.useEffect(() => {
      setValue({
        name: row_value,
      });
  }, []);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...mid_class_names]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      value={value}
      id="disable-close-on-select"
      sx={{ width: "150px" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      //   isOptionEqualToValue={(option, value) => option.name === value.name}
      //   getOptionLabel={(option) => option.name}
      onChange={(event: ChangeEvent<any>, newValue) => {
        // debugger;
        if (typeof newValue === "string") {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
        handleDataChange(event, row_id, "asset_mid_class");
      }}
      onBlur={(event: ChangeEvent<any>) => handleDataBlur(event, row_id, 'asset_mid_class')}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }
        return filtered;
      }}
    //   selectOnFocus
    //   clearOnBlur
    //   handleHomeEndKeys
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      options={options}
      loading={loading}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

const mid_class_names = [
  { name: "중분류1" },
  { name: "중분류2" },
  { name: "중분류3" },
];
