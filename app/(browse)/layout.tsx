import { FC, Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Container } from "./_components/sidebar/container";

type Props = {
  children: React.ReactNode;
};

const BrowseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};
export default BrowseLayout;
