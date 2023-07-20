import { FC, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../states/user";

interface PermissionProps {
  allowedPermissions: string[]
  children: ReactNode;
}

const Permission: FC<PermissionProps> = (props) => {
  const user = useRecoilValue(userAtom);
  const isAllowed = (): boolean => {
    return user.role && user.role.permissions.some((p: { id: number, permission: string }) => props.allowedPermissions.includes(p.permission));
  };
  return <>{ isAllowed() ? props.children : null }</>;
};

export default Permission;
