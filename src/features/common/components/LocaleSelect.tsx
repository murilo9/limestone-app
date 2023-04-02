import { Language } from "@mui/icons-material";
import { Select, Box, MenuItem } from "@mui/material";
import React, { useState } from "react";

const localeDictionary: { [key: string]: string } = {
  en: "English",
  // "pt-BR": "Português",
};

type LocaleSelectProps = {
  sx?: { [key: string]: any };
  inputProps?: { [key: string]: any };
};

export default function LocaleSelect({ sx, inputProps }: LocaleSelectProps) {
  const [locale, setLocale] = useState("en");

  return (
    <>
      <Select
        size="small"
        value={locale}
        onChange={(event) => setLocale(event.target.value)}
        renderValue={(value) => (
          <>
            <Box sx={{ display: "flex" }}>
              <Language />
              <Box sx={{ ml: 1, display: { xs: "none", sm: "inline" } }}>
                {localeDictionary[value]}
              </Box>
            </Box>
          </>
        )}
        sx={{ ...sx }}
        inputProps={{ ...inputProps }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="pt-BR">Portugês</MenuItem>
      </Select>
    </>
  );
}
