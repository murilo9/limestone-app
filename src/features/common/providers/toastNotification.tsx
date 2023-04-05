import { Alert, Box, Snackbar } from "@mui/material";
import { createContext, ReactNode, useState } from "react";
import { ToastNotification } from "../types/ToastNotification";

type ToastNotificationProviderProps = {
  children: ReactNode;
};

type HorizontalToastOptions = "left" | "center" | "right";
type VerticalToastOptions = "bottom" | "top";

export const ToastNotificationContext = createContext({
  currentNotification: null as ToastNotification | null,
  send: (
    notification: ToastNotification,
    options?: {
      vertical?: VerticalToastOptions;
      horizontal?: HorizontalToastOptions;
    }
  ) => {},
});

export default function ToastNotificationProvider(
  props: ToastNotificationProviderProps
) {
  const [currentNotification, setCurrentNotification] =
    useState<ToastNotification | null>(null);
  const [horizontal, setHorizontal] = useState<HorizontalToastOptions>("left");
  const [vertical, setVertical] = useState<VerticalToastOptions>("bottom");
  const [notificationOpacity, setNotificationOpacity] = useState<
    string | number
  >(1);

  const contextValue = {
    currentNotification,
    send: (
      notification: ToastNotification,
      options?: {
        vertical?: VerticalToastOptions;
        horizontal?: HorizontalToastOptions;
      }
    ) => {
      if (options) {
        setHorizontal(options.horizontal || horizontal);
        setVertical(options.vertical || vertical);
      }
      setCurrentNotification(notification);
    },
  };

  const onCloseNotification = () => {
    setNotificationOpacity("0 !important");
    setTimeout(() => {
      setCurrentNotification(null);
    }, 2000);
  };

  return (
    <ToastNotificationContext.Provider value={contextValue}>
      {props.children}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={!!currentNotification}
        {...currentNotification}
        onClose={onCloseNotification}
      >
        <Alert
          severity={currentNotification?.severity}
          onClose={onCloseNotification}
          sx={{
            opacity: notificationOpacity,
            transition: "opacity 2s",
          }}
        >
          {currentNotification?.message}
        </Alert>
      </Snackbar>
    </ToastNotificationContext.Provider>
  );
}
