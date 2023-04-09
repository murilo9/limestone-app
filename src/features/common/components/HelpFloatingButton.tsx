import { InfoOutlined, QuestionMark } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Fab,
  List,
  ListItem,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ToastNotificationContext } from "../providers/toastNotification";

const content = [
  {
    title: "Boards",
    items: ["Click on a board's title to see it in more details."],
  },
  {
    title: "columns",
    items: [
      "Inside a board, enable 'Edit Columns Mode' in order to change your columns' titles and position.",
      "Columns are draggable as well! Just make sure you have 'Edit Columns Mode' on to swap them.",
    ],
  },
  {
    title: "Cards",
    items: [
      "Drag cards anytime when you are at a board in order to move them between columns.",
    ],
  },
];

export default function HelpFloatingButton() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const notification = useContext(ToastNotificationContext);

  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const onClose = () => {
    setOpen(null);
  };

  const onHideHelp = () => {
    setShowHelpButton(false);
    setOpen(null);
    window.localStorage.removeItem("hide_help_button");
    notification.send(
      {
        message:
          "Help button hidden. You may activate it again at user settings.",
        severity: "info",
      },
      { horizontal: "center" }
    );
  };

  const [showHelpButton, setShowHelpButton] = useState(
    !window.localStorage.getItem("hide_help_button")
  );

  return (
    <>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: { xs: "16px", sm: "24px" },
          right: { xs: "16px", sm: "24px" },
          display: showHelpButton ? "flex" : "none",
        }}
        onClick={onOpen}
      >
        <QuestionMark />
      </Fab>
      <Menu
        id="help-menu"
        anchorEl={open}
        open={Boolean(open)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{ sx: { mt: -2 } }}
      >
        <Container
          maxWidth="xs"
          sx={{ py: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InfoOutlined sx={{ mr: 1 }} />
              <Typography
                variant="subtitle1"
                fontSize="20px"
              >
                {"Help & Info"}
              </Typography>
            </Box>
            <Button
              color="error"
              onClick={onHideHelp}
            >
              Hide
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ maxHeight: "90vh", overflowY: "auto" }}>
            {content.map((topic) => (
              <>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="#444444"
                  sx={{ mt: 1 }}
                >
                  {topic.title}
                </Typography>
                <List>
                  {topic.items.map((item) => (
                    <ListItem
                      sx={{ color: "#666666", pb: 0, px: 1, fontSize: "14px" }}
                    >
                      {item}
                    </ListItem>
                  ))}
                </List>
              </>
            ))}
          </Box>
        </Container>
      </Menu>
    </>
  );
}
