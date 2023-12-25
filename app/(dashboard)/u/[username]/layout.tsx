import { FC } from "react";
import { getSelfByUsername } from "@/lib/service/auth";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/sidebar/container";

type Props = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

const CreatorLayout: FC<Props> = async ({ children, params: { username } }) => {
  const self = await getSelfByUsername(username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Container>{children}</Container>
        <Sidebar />
      </div>
    </>
  );
};
export default CreatorLayout;
