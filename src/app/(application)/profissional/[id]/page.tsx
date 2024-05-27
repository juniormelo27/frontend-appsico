import masked from '@/libraries/masked';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import authOptions from '@/services/auth';
import http from '@/services/fetch';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ButtonChat from './buttonChat';
import ButtonFollowAndUnfollow from './buttonFollowAndUnfollow';

type ProfessionalResponse = {
  id: string;
  name: string;
  image?: string;
  profile: {
    bio: string;
    specialties: Array<{
      id: string;
      name: string;
    }>;
    approach: Array<{
      id: string;
      name: string;
    }>;
    service: Array<string>;
  };
  address: {
    street: string;
    number: number;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    state_code: string;
    country: string;
    country_code: string;
  };
  email: string;
  phone: string;
  _count: {
    followers: number;
    following: number;
    connections: number;
  };
};

export default async function ProfessionalDetailsScreen({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerSession(authOptions);

  const [data, subscriber] = await Promise.all([
    http<ProfessionalResponse>(`/professionals/${id}`, {
      method: 'GET',
      next: {
        tags: [`professional.${id}`],
      },
    }),
    http<boolean>(
      `/professionals/${id}/social/verify/?user=${session?.user.id!}`,
      {
        method: 'GET',
      }
    ),
  ]);

  if (!data) {
    redirect('/profissionais');
  }
  return (
    <main>
      <section className='relative'>
        <div className='relative flex flex-col min-w-0 break-words border bg-white w-full border-b-0 rounded-lg'>
          <div className='px-6 grid grid-cols-[35vw_auto] max-md:grid-cols-1'>
            <div className='flex-1 w-full border-r max-md:border-r-0 max-md:border-b py-10'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full px-4 lg:order-2 flex justify-center relative'>
                  <div className='relative items-center justify-center text-center self-center flex'>
                    <Image
                      src={data.image || PLACEHOLDER}
                      width={1280}
                      height={1280}
                      alt='image'
                      placeholder='blur'
                      blurDataURL={PLACEHOLDER.blurDataURL}
                      className='z-10 w-56 h-56 rounded-full'
                    />
                  </div>
                  <ButtonFollowAndUnfollow id={id} subscriber={subscriber} />
                </div>
              </div>
              <div className='text-center mt-6'>
                <div className='flex justify-center'>
                  <div className='flex justify-center'>
                    <div className='lg:mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                        {data._count.followers}
                      </span>
                      <span className='text-sm text-blueGray-400'>
                        Seguidores
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <div className='lg:mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                        {data._count.following}
                      </span>
                      <span className='text-sm text-blueGray-400'>
                        Seguindo
                      </span>
                    </div>
                  </div>
                  <div className='lg:mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                      {data._count.connections}
                    </span>
                    <span className='text-sm text-blueGray-400'>Conexões</span>
                  </div>
                </div>
                <center>
                  <h3 className='text-4xl font-semibold leading-normal text-blueGray-700 mb-2 mt-4 truncate mx-auto px-8 text-center items-center justify-center'>
                    {masked.name(data.name)}
                  </h3>
                </center>
                <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                  <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>
                  {data.address.city}, {data.address.state} -{' '}
                  {data.address.country_code}
                </div>
                <ButtonChat id={id} />
                <div className='mb-2 text-blueGray-600 mt-10 capitalize flex flex-col'>
                  <span className='text-base font-semibold'>E-mail</span>
                  <span className='text-gray-500 text-sm lowercase'>
                    {data.email}
                  </span>
                </div>
                {/* <div className='mb-2 text-blueGray-600 mt-10 capitalize flex flex-col'>
                  <span className='text-base font-semibold'>Contato</span>
                  <span className='text-gray-500 text-sm lowercase'>
                    {masked.phone(data.phone.slice(2))}
                  </span>
                </div> */}
                <div className='mb-2 text-blueGray-600 mt-10 capitalize flex flex-col'>
                  <span className='text-base font-semibold'>
                    Tipo de atendimento
                  </span>
                  <span className='text-gray-500 text-sm'>
                    {data.profile.service
                      .map((item) => {
                        let message;

                        switch (item) {
                          case 'private':
                            message = 'particular';
                            break;
                          case 'social':
                            message = 'social';
                            break;
                          case 'covenant':
                            message = 'convênio';
                            break;
                          default:
                            message = 'indefinido';
                            break;
                        }

                        return message;
                      })
                      .join(', ')}
                  </span>
                </div>
              </div>
            </div>
            <div className='p-10 space-y-6'>
              <div>
                <span className='text-base font-semibold'>Biografia:</span>
                <p className='text-gray-500'>{data.profile.bio}</p>
              </div>
              <div>
                <span className='text-base font-semibold'>Especialidades:</span>
                <ul className='pl-5'>
                  {data.profile.specialties.map((item) => (
                    <li key={item.id} className='text-gray-500 list-disc'>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className='text-base font-semibold'>Abordagem:</span>
                <ul className='pl-5'>
                  {data.profile.approach.map((item) => (
                    <li key={item.id} className='text-gray-500 list-disc'>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
