'use client';

import { LucideInstagram } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const social: Array<{
  icon: React.ReactNode;
  title: string;
  url: string;
}> = [
  {
    icon: <LucideInstagram />,
    title: 'Instagram',
    url: 'https://instagram.com/appsico_official',
  },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/chat')) {
    return;
  }

  return (
    <footer className='bg-white shadow-md border-t pt-10'>
      <div className='mx-auto'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 px-24'>
          <div>
            <div className='flex justify-center text-priamry sm:justify-start'>
              <h1 className='text-primary font-extrabold text-3xl'>
                App<span className='font-light'>sico</span>
              </h1>
            </div>
            <p className='mt-6 max-w-md text-center text-gray-500 text-sm leading-snug sm:max-w-xs sm:text-left'>
              A ponte digital para o bem-estar: simplificamos a conexão entre
              psicólogos e pacientes, facilitando o acesso a tratamentos
              psicológicos com transparência e confiança
            </p>
            <ul className='mt-8 flex justify-center gap-6 sm:justify-start md:gap-8'>
              {social.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    rel='noreferrer'
                    target='_blank'
                    className='text-primary'
                  >
                    {item.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2'>
            <div className='text-center sm:text-left'>
              <p className='text-lg font-medium text-gray-900'>About Us</p>
              <ul className='mt-8 space-y-4 text-sm'>
                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    Company History
                  </a>
                </li>

                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    Meet the Team
                  </a>
                </li>

                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    Employee Handbook
                  </a>
                </li>

                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    {' '}
                    Careers{' '}
                  </a>
                </li>
              </ul>
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-lg font-medium text-gray-900'>Our Services</p>

              <ul className='mt-8 space-y-4 text-sm'>
                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    Web Development
                  </a>
                </li>

                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    {' '}
                    Web Design{' '}
                  </a>
                </li>

                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    {' '}
                    Marketing{' '}
                  </a>
                </li>

                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    {' '}
                    Google Ads{' '}
                  </a>
                </li>
              </ul>
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-lg font-medium text-gray-900'>Helpful Links</p>

              <ul className='mt-8 space-y-4 text-sm'>
                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    {' '}
                    FAQs{' '}
                  </a>
                </li>

                <li>
                  <a
                    className='text-gray-500 transition hover:text-gray-500/75'
                    href='#'
                  >
                    {' '}
                    Support{' '}
                  </a>
                </li>
              </ul>
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-lg font-medium text-gray-900'>Contact Us</p>
              <ul className='mt-8 space-y-4 text-sm'>
                <li>
                  <Link
                    target='_blank'
                    className='flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end'
                    href='mailto:appsico.contato@gmail.com'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='size-5 shrink-0 text-gray-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>

                    <span className='flex-1 text-gray-500'>
                      appsico.contato@gmail.com
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    target='_blank'
                    className='flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end'
                    href='https://wa.me/5511948827601'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='size-5 shrink-0 text-gray-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                      />
                    </svg>

                    <span className='flex-1 text-gray-500'>
                      +55 (11) 94882-7601
                    </span>
                  </Link>
                </li>
                <li className='flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='size-5 shrink-0 text-gray-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>

                  <address className='-mt-0.5 flex-1 not-italic text-gray-500'>
                    Rua Alegre 633, Santa Paula, São Caetano do Sul
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='mt-12 border-t border-gray-100 py-6 px-24'>
          <div className='text-center sm:flex sm:justify-between sm:text-left'>
            <p className='text-sm text-gray-500'>
              <span className='block sm:inline mr-6'>
                Todos os direitos reservados.
              </span>

              <a
                className='inline-block text-priamry underline transition hover:text-priamry/75'
                href='#'
              >
                Termos de uso
              </a>

              <span className='mx-1'>&middot;</span>

              <a
                className='inline-block text-priamry underline transition hover:text-priamry/75'
                href='#'
              >
                Politica de privacidade
              </a>
            </p>

            <p className='mt-4 text-sm text-gray-500 sm:order-first sm:mt-0'>
              &copy; {new Date().getFullYear()} Appsico
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
