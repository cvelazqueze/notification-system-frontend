import './globals.css';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Notification System',
  description: 'A simple notification system built with Next.js and Nest.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
