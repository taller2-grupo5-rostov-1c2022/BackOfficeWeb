import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSetRole } from "../../services/requests";
import { AuthUserType } from "../../util/types";

type RoleButtonProps = {
  user: AuthUserType;
};
const RoleButton = ({ user }: RoleButtonProps) => {
  const setRole = useSetRole();

  const [currentRole, setCurrentRole] = useState(
    user?.customClaims?.role ?? "listener"
  );

  const _setRole = async (role: string) => {
    const res = await setRole(user?.uid, role);
    setCurrentRole(res.role);
  };

  useEffect(() => {
    setCurrentRole(user?.customClaims?.role ?? "listener");
  }, [user]);

  const roles = ["listener", "artist", "admin"];

  return (
    <Stack spacing={2} direction="row">
      {roles.map((role, index) => (
        <Button
          key={index}
          onClick={() => _setRole(role)}
          variant={currentRole === role ? "contained" : "outlined"}
        >
          {role}
        </Button>
      ))}
    </Stack>
  );
};

export default RoleButton;
