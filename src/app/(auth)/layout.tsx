import authOptions from '@/services/auth';
import { LucideChevronLeft } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/');
  }

  return (
    <main className='w-screen h-screen max-md:h-full grid grid-cols-[35vw_auto] max-md:grid-cols-1 max-md:items-start max-md:justify-start max-md:!overflow-scroll'>
      <Link
        href='/'
        className='absolute z-50 top-2 left-2 flex flex-row items-center justify-start gap-2 hover:underline text-primary max-md:text-white text-sm'
      >
        <LucideChevronLeft className='w-4 h-4' />
        Início
      </Link>
      {children}
      <div className='w-full h-full max-md:h-[10vh] relative max-md:order-first bg-red-500'>
        <div className='w-full h-screen max-md:h-full flex items-center justify-center absolute top-0 bottom-0 left-0 right-0'>
          <h1 className='text-6xl max-md:text-3xl text-white font-extrabold'>
            App<span className='font-extralight'>sico</span>
          </h1>
        </div>
        <div className='w-full h-full bg-primary' />
      </div>
    </main>
  );
}
