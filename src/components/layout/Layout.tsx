import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 pt-20">
        <Breadcrumbs />
        {children}
      </main>

      <Footer />
    </div>
  );
};
