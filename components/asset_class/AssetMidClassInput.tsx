import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { ChangeEvent } from "react";
import { useAssetMidClass } from "@/hooks/asset_class/useAssetMidClass";
import { useAssetClass } from "@/hooks/asset_class/useAssetClass";
import { mid_class_name } from "@/redux/asset_class/AssetMidClass";


interface AssetMidClassProps {
  row_id: number;
  row_value: string;
}

const filter = createFilterOptions<mid_class_name>();

export default function AssetMidClass(props: AssetMidClassProps) {
  const { row_id, row_value } = props;
  const { 
    validationList, 
    handleDataChange, 
    handleDataBlur 
  } = useAssetClass();
  const {
    value, setValue,
    open, setOpen,
    options,
    loading
  } = useAssetMidClass(row_value);

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
      onChange={(event: ChangeEvent<any>, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
        handleDataChange(event, row_id, "asset_mid_class");
      }}
      onBlur={(event: ChangeEvent<any>) =>
        handleDataBlur(event, row_id, "asset_mid_class")
      }
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }
        return filtered;
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.name;
      }}
      options={options}
      loading={loading}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField
          variant="standard"
          helperText={(validationList.find(item => item.id === row_id))?.asset_mid_class ? "한글 영문 입력" : ''}
          error={(validationList.find(item => item.id === row_id))?.asset_mid_class}
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
