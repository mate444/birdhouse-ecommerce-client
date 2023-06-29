import { FC, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../states/user";
import { useNavigate } from "react-router-dom";

interface PermissionProps {
  allowedPermissions: string[]
  children: ReactNode;
}

const Permission: FC<PermissionProps> = (props) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const isAllowed = (): boolean => {
    return user.role.permissions.some((p: { id: number, permission: string }) => props.allowedPermissions.includes(p.permission));
  };
  return <>{ isAllowed() ? props.children : navigate("/not-found")}</>;
};

export default Permission;
