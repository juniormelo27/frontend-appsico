import Footer from './containers/footer';
import Header from './containers/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex flex-col justify-between min-h-screen'>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
