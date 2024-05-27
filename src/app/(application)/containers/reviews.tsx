import Image from 'next/image';

const data: Array<{
  title: string;
  content: string;
  image: string;
}> = [
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'João P.',
    content:
      'A Appsico foi uma verdadeira mão na roda! Estava tendo dificuldade em encontrar um psicólogo que aceitasse meu plano de saúde e que tivesse horários compatíveis com minha rotina. A plataforma facilitou a busca, permitindo filtrar por especialidade, localização e disponibilidade. Agora, estou fazendo terapia com uma profissional incrível e já sinto os benefícios no meu dia a dia.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'Maria S.',
    content:
      'Eu nunca havia feito terapia antes e estava um pouco perdida sobre como começar. A Appsico me ajudou bastante.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'Carlos M.',
    content:
      'A flexibilidade de agendar consultas diretamente pelo aplicativo foi o que mais me atraiu na Appsico. Eu trabalho em horários variados e conseguir encontrar um psicólogo que pudesse me atender fora do horário comercial foi essencial. O atendimento é de alta qualidade e estou muito satisfeito com a evolução do meu tratamento.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'Ana L.',
    content:
      'Estava passando por um momento muito difícil e precisava de ajuda urgente. A Appsico me permitiu encontrar um psicólogo disponível para uma consulta de emergência. A rapidez e eficiência da plataforma foram cruciais para que eu recebesse o suporte necessário no momento certo.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'Pedro A.',
    content:
      'Sou estudante universitário e meu orçamento é limitado. A Appsico me ajudou a encontrar um psicólogo que oferecesse tarifas sociais para estudantes. Além disso, o feedback de outros pacientes na plataforma me deu confiança para escolher o profissional certo para mimF.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'Juliana R.',
    content:
      'A variedade de psicólogos na Appsico é impressionante. Consegui encontrar um terapeuta especializado em transtornos de ansiedade, que é o meu caso, e a diferença no meu bem-estar mental é enorme. Recomendo a todos que estão procurando ajuda psicológica.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'Marcos F.',
    content:
      'A função de consulta online da Appsico foi um divisor de águas para mim. Moro em uma cidade pequena com poucos profissionais de saúde mental, e a possibilidade de fazer terapia online com um psicólogo qualificado fez toda a diferença na minha vida. Excelente plataforma!',
  },
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'Fernanda C.',
    content:
      'O suporte ao cliente da Appsico é muito atencioso. Tive uma dúvida sobre como funcionava o pagamento das sessões e eles foram rápidos e claros em suas respostas. Encontrei um psicólogo maravilhoso e estou progredindo muito na minha terapia.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'Lucas T.',
    content:
      'A plataforma da Appsico é extremamente intuitiva. Em poucos minutos, consegui montar um perfil, definir meus critérios de busca e marcar minha primeira consulta. O psicólogo que encontrei é excelente e já me sinto muito mais confiante em lidar com minhas questões emocionais.',
  },
];

export default function Reviews() {
  return (
    <section className='bg-white my-10 mb-20 max-md:my-5 max-md:px-5'>
      <div className='mx-auto max-w-screen-xl py-12 sm:px-6 lg:px-8 lg:py-16'>
        <h2 className='text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
          Depoimento de usuários{' '}
          <sup className=' text-destructive text-sm'>( Futuro )</sup>
        </h2>
        <div className='mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8'>
          {data.map((item, index) => (
            <div key={index} className='mb-8 sm:break-inside-avoid'>
              <blockquote className='rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8'>
                <div className='flex items-center gap-4'>
                  <Image
                    alt={item.title}
                    src={item.image}
                    className='size-14 rounded-full object-cover'
                    width={512}
                    height={512}
                  />
                  <div>
                    <div className='flex justify-center gap-0.5 text-primary'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    </div>

                    <p className='mt-0.5 text-lg font-medium text-gray-900'>
                      {item.title}
                    </p>
                  </div>
                </div>
                <p className='mt-4 text-gray-700'>{item.content}</p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
