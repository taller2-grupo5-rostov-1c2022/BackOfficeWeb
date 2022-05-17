import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSetDisabled } from "../../services/requests";
import { AuthUserType } from "../../util/types";

type DisabledButtonProps = {
  user: AuthUserType;
};
const DisabledButton = ({ user }: DisabledButtonProps) => {
  const setDisabled = useSetDisabled();

  const [currentDisabled, setCurrentDisabled] = useState(
    user?.disabled ?? false
  );

  const _setDisabled = async (disabled: boolean) => {
    console.log(user?.uid, disabled);
    const res = await setDisabled(user?.uid, disabled);
    setCurrentDisabled(res.disabled);
  };

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
