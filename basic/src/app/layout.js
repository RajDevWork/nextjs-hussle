
import ProgressProvider from "@/components/ProgressProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <ProgressProvider />
        {children}
      </body>
    </html>
  );
}