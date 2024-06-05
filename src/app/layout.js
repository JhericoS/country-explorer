import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Sidebar from "../components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Country Explorer",
  description: "Created by Jherico Solier",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Sidebar />
        <main className="p-4 mt-16 md:mt-0 md:ml-64">
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
