import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};
export default AuthLayout;
