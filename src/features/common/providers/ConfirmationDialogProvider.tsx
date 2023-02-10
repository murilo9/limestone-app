import react, { createContext, ReactNode, useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { ConfirmationDialogConfig } from "../types/ConfirmationDialogConfig";

type ConfirmationDialogProviderProps = {
  children: ReactNode;
};

export const ConfirmationDialogContext = createContext({
  open: (config: ConfirmationDialogConfig) => {},
});

export default function ConfirmationDialogProvider({
  children,
}: ConfirmationDialogProviderProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [currentConfig, setCurrentConfig] =
    useState<ConfirmationDialogConfig | null>(null);

  const open = (config: ConfirmationDialogConfig) => {
    setCurrentConfig(config);
    setShowDialog(true);
  };

  const contextValue = {
    open,
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setCurrentConfig(null);
  };

  const handleActionClick = (index: number) => {
    const action = currentConfig?.actions[index];
    if (action) {
      handleDialogClose();
      action.onClick();
    }
  };

  return (
    <>
      <ConfirmationDialogContext.Provider value={contextValue}>
        {children}
        {currentConfig ? (
          <ConfirmationDialog
            {...currentConfig}
            config={currentConfig}
            open={showDialog}
            onClose={handleDialogClose}
            onActionClick={handleActionClick}
          />
        ) : null}
      </ConfirmationDialogContext.Provider>
    </>
  );
}
