import * as React from "react";
import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useAssetName } from "@/hooks/dividend/useAssetName";

interface AssetNameProps {
    handleSelectAssetName: (event: ChangeEvent<any>) => void;
  }

export default function AssetName(props: AssetNameProps) {
  const { handleSelectAssetName } = props;
  const { open, setOpen, options, loading } = useAssetName();

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: '100%' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event: ChangeEvent<any>) => {
        handleSelectAssetName(event);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="자산 선택"
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
