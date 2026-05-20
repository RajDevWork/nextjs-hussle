
// import Providers from "@/components/ProgressProvider";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">

         <NextTopLoader
          height={5}
          showSpinner={false}
        />
        {children}

        {/* <Providers>{children}</Providers> */}
      </body>
    </html>
  );
}