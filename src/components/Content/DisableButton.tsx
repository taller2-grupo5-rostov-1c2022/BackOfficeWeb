import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSetContentDisabled } from "../../services/requests";
import { toast } from "react-toastify";

type DisabledButtonProps = {
  isDisabled: boolean;
  id: string | number;
  type: "song" | "album" | "playlist";
};
const DisabledButton = ({ isDisabled, id, type }: DisabledButtonProps) => {
  const setDisabled = useSetContentDisabled();

  const [currentDisabled, setCurrentDisabled] = useState(isDisabled ?? false);

  const _setDisabled = async (disabled: boolean) => {
    try {
      await setDisabled(id, disabled, type);
      setCurrentDisabled(disabled);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    setCurrentDisabled(isDisabled);
  }, [isDisabled]);

  return (
    <Button
      onClick={() => _setDisabled(!currentDisabled)}
      variant={currentDisabled ? "contained" : "outlined"}
      color="secondary"
    >
      {currentDisabled ? "Disabled" : "Disable"}
    </Button>
  );
};

export default DisabledButton;
