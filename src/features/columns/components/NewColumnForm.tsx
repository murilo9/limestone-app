import { Add } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React, { KeyboardEventHandler, useState } from "react";

type NewColumnFormProps = {
  onSubmit: (columnTitle: string) => void;
};

export default function NewColumnForm({ onSubmit }: NewColumnFormProps) {
  const [showInput, setShowInput] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      onSubmit(columnTitle);
    }
  };

  const handleBlur = () => {
    setShowInput(false);
    setColumnTitle("");
  };

  return (
    <>
      <Box sx={{ width: "240px" }}>
        {showInput ? (
          <TextField
            value={columnTitle}
            onChange={(event) => setColumnTitle(event.target.value)}
            placeholder="Column title"
            size="small"
            variant="standard"
            autoFocus
            fullWidth
            onBlur={handleBlur}
            onKeyUp={handleKeyPress}
          />
        ) : (
          <Button
            disableElevation
            variant="contained"
            color="secondary"
            size="small"
            sx={{ pr: 2, fontStyle: "italic" }}
            onClick={() => setShowInput(true)}
            fullWidth
          >
            <Add sx={{ fontSize: "18px", mr: "4px" }} />
            Add Column
          </Button>
        )}
      </Box>
    </>
  );
}
