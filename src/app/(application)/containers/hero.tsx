import { Button } from '@/components/ui/button';
import { cn } from '@/libraries/utils';
import authOptions from '@/services/auth';
import http from '@/services/fetch';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

type ResponseAnalytics = {
  count: number;
};

export default async function Hero() {
  const session = await getServerSession(authOptions);

  const [patients, professionals, conversations] = await Promise.all([
    await http<ResponseAnalytics>('/analytics/count/patients', {
      // next: {
      //   revalidate: 3600,
      // },
    }),
    await http<ResponseAnalytics>('/analytics/count/professionals', {
      // next: {
      //   revalidate: 3600,
      // },
    }),
    await http<ResponseAnalytics>('/analytics/count/conversations', {
      // next: {
      //   revalidate: 3600,
      // },
    }),
  ]);

  const analytics = {
    count: {
      patients: patients.count,
      professionals: professionals.count,
      conversations: conversations.count,
    },
    sum: {
      users: patients.count + professionals.count,
    },
  };

  return (
    <section className='px-24 max-md:px-5 grid grid-cols-[auto_40vw] max-md:grid-cols-1 gap-40 max-md:gap-4 items-center justify-center self-center mt-24 max-md:mt-0 mb-6'>
      <div className='w-full py-8'>
        <div className='text-left'>
          <h2 className='text-3xl font-medium sm:text-4xl'>
            A Rede Social para Psicólogos e Pacientes
          </h2>
          <p className='mt-4 text-gray-500'>
            A ponte digital para o bem-estar: simplificamos a conexão entre
            psicólogos e pacientes, facilitando o acesso a tratamentos
            psicológicos com transparência e confiança
          </p>
          {!session && (
            <Link href='/acessar' className='mt-10 block w-fit'>
              <Button>Fazer Login</Button>
            </Link>
          )}
          {!!session && (
            <Link href='/profissional' className='mt-10 block w-fit'>
              <Button>Procurar Profissional</Button>
            </Link>
          )}
          <div className='flex flex-row items-center justify-start gap-10 mt-14'>
            {[
              {
                title: `${analytics.count.patients}+`,
                description: 'Usuários',
              },
              {
                title: `${analytics.count.professionals}+`,
                description: 'Profissionais',
              },
              {
                title: `${analytics.count.conversations}+`,
                description: 'Conexões',
              },
            ].map((item, index) => (
              <div key={index}>
                <span className='text-3xl font-normal block'>{item.title}</span>
                <div
                  className={cn(
                    'w-full h-[0.2rem] bg-gradient-to-r to-primary from-white mb-1',
                    index === 1 && '',
                    index === 2 && ''
                  )}
                />
                <span className='text-sm font-normal text-gray-400 block'>
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-[auto_35%] gap-4'>
        <Image
          src='https://labormac.com.br/wp-content/uploads/medico.png'
          width={1280}
          height={1280}
          className='w-full h-fit max-md:h-full rounded-lg -mt-10 max-md:mt-0 bg-gradient-to-tr from-primary to-blue-400 pt-10'
          alt='image'
        />
        <div className='mt-4 max-md:mt-0 grid grid-cols-1 gap-4'>
          <Image
            src='https://clinicadacidade.com.br/wp-content/uploads/2023/03/medica-banner-site-1-683x1024.png'
            width={1280}
            height={1280}
            className='w-full h-full rounded-lg bg-gradient-to-br to-blue-400 from-blue-200'
            alt='image'
          />
          <Image
            src='https://static.vecteezy.com/system/resources/previews/026/791/940/non_2x/professor-doctor-acting-pointing-fingers-look-like-professional-medical-healthcare-in-transparent-background-png.png'
            width={1280}
            height={1280}
            className='w-full h-full rounded-lg bg-gradient-to-r to-primary from-blue-200'
            alt='image'
          />
        </div>
      </div>
    </section>
  );
}
