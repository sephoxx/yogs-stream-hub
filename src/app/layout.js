import { Inter } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/md-dark-indigo/theme.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yogs Jingle Jam Stream Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
