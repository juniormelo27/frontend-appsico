import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import Image from 'next/image';
import ButtonChat from './button-chat';

export default function ProfessionalDetailsScreen({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return (
    <main>
      <section className='relative '>
        <div className='relative flex flex-col min-w-0 break-words border bg-white w-full border-b-0 rounded-lg'>
          <div className='px-6 grid grid-cols-[35vw_auto] max-md:grid-cols-1'>
            <div className='flex-1 w-full border-r max-md:border-r-0 max-md:border-b py-10'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full px-4 lg:order-2 flex justify-center relative'>
                  <div className='relative items-center justify-center text-center self-center flex'>
                    <Image
                      src={PLACEHOLDER}
                      width={1280}
                      height={1280}
                      alt='image'
                      className='z-10 w-56 h-56 rounded-full'
                    />
                  </div>
                </div>
              </div>
              <div className='text-center mt-6'>
                <div className='flex justify-center'>
                  <div className='mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                      22
                    </span>
                    <span className='text-sm text-blueGray-400'>
                      Seguidores
                    </span>
                  </div>
                  <div className='mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                      10
                    </span>
                    <span className='text-sm text-blueGray-400'>Seguindo</span>
                  </div>
                  <div className='lg:mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                      89
                    </span>
                    <span className='text-sm text-blueGray-400'>Conexões</span>
                  </div>
                </div>
                <h3 className='text-4xl font-semibold leading-normal text-blueGray-700 mb-2 mt-4'>
                  Jenna Stones
                </h3>
                <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                  <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>
                  Los Angeles, California
                </div>
                <ButtonChat id={id} />
                <div className='mb-2 text-blueGray-600 mt-10'>
                  <i className='fas fa-briefcase mr-2 text-lg text-blueGray-400'></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className='mb-2 text-blueGray-600'>
                  <i className='fas fa-university mr-2 text-lg text-blueGray-400'></i>
                  University of Computer Science
                </div>
              </div>
            </div>
            <div className='p-10 space-y-6'>
              <div>
                <span className='text-base font-semibold'>Bio:</span>
                <p className='text-gray-500'>
                  fdsfd sf dsf ds fds f dsf df ds fds fds fds fsd f dsf dsf ds
                  fds fds f dsf dsf dsfds
                </p>
              </div>
              <div>
                <span className='text-base font-semibold'>Especialidades:</span>
                <p className='text-gray-500'>
                  fdsfd sf dsf ds fds f dsf df ds fds fds fds fsd f dsf dsf ds
                  fds fds f dsf dsf dsfds
                </p>
              </div>
              <div>
                <span className='text-base font-semibold'>
                  Tipo de atendimento:
                </span>
                <p className='text-gray-500'>
                  fdsfd sf dsf ds fds f dsf df ds fds fds fds fsd f dsf dsf ds
                  fds fds f dsf dsf dsfds
                </p>
              </div>
              <div>
                <span className='text-base font-semibold'>Abordagem:</span>
                <p className='text-gray-500'>
                  fdsfd sf dsf ds fds f dsf df ds fds fds fds fsd f dsf dsf ds
                  fds fds f dsf dsf dsfds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
