const types: Array<{
  id: string;
  icon: React.ReactNode;
  title: string;
  data: string[];
  image: [string, string];
}> = [
  {
    id: 'particular',
    icon: (
      <svg
        className='flex-shrink-0 block size-7 text-gray-800'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' />
        <path d='M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' />
        <path d='M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' />
        <path d='M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' />
        <path d='M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' />
      </svg>
    ),
    title: 'particular',
    data: [
      'Plano de tratamento personalizado',
      'Abordagem específica para seus desafios',
      'Espaço seguro e confidencial: Explore seus pensamentos e sentimentos sem julgamentos.',
      'Autoconhecimento e desenvolvimento pessoal: Alcance maior autoconfiança e realização.',
      'Bem-estar emocional, social e profissional: Uma vida mais plena e feliz.',
    ],
    image: [
      'https://img.freepik.com/fotos-gratis/respingo-colorido-abstrato-3d-background-generativo-ai-background_60438-2509.jpg',
      'https://s2-techtudo.glbimg.com/JsE244mucjKWLYtNgeiDyfVYlJQ=/0x129:1024x952/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/7/i/ME2AxRRoygUyFPCDe0jQ/3.png',
    ],
  },
  {
    id: 'convetion',
    icon: (
      <svg
        className='flex-shrink-0 block size-7 text-gray-800'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' />
        <path d='M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' />
        <path d='M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' />
        <path d='M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' />
        <path d='M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' />
      </svg>
    ),
    title: 'convênio',
    data: [
      'Plano de saúde cobre ou reduz custos.',
      'Acompanhamento a longo prazo.',
      'Profissionais qualificados à disposição.',
    ],
    image: [
      'https://media.istockphoto.com/id/517188688/pt/foto/paisagem-de-montanha.jpg?s=612x612&w=0&k=20&c=uFGUrUT6gA8FrTWhE10YYzngWPlDLssKxJiDs1Qw2Qs=',
      'https://cdn.pixabay.com/photo/2017/01/08/19/30/rio-de-janeiro-1963744_640.jpg',
    ],
  },
  {
    id: 'social',
    icon: (
      <svg
        className='flex-shrink-0 block size-7 text-gray-800'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' />
        <path d='M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' />
        <path d='M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' />
        <path d='M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' />
        <path d='M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' />
      </svg>
    ),
    title: 'social',
    data: [
      'Gratuito ou a preços populares.',
      'Acompanhamento especializado: Psicólogos qualificados à disposição.',
      'Avaliação, plano de tratamento, grupos terapêuticos e apoio.',
      'Para: População de baixa renda, vítimas de violência, pessoas com transtornos mentais e em situação de vulnerabilidade.',
    ],
    image: [
      'https://dm0fehhuxv6f6.cloudfront.net/wp-content/uploads/2023/04/30035515/bing-panda-600x600.jpg',
      'https://chatgpt.com.br/wp-content/uploads/2023/07/dall_e_2_dog.jpg',
    ],
  },
];

export default function TypeServices() {
  return (
    <div className='px-24 max-md:px-5 py-10 max-md:py-5 max-md:pb-0 grid sm:flex gap-y-px sm:gap-y-0 sm:gap-x-4 max-md:space-y-6'>
      {types.map((item) => (
        <div
          key={item.id}
          className='w-full cursor-default flex flex-col text-start p-3 md:p-5 max-md:py-5 rounded-xl border'
        >
          {item.icon}
          <span className='mt-5 max-md:mt-3'>
            <span className='block capitalize font-semibold text-gray-800'>
              {item.title}
            </span>
            <ul className='lg:block mt-2 text-gray-800'>
              {item.data.map((item, index) => (
                <div
                  key={index}
                  className='flex flex-row items-start justify-start gap-2 mb-2'
                >
                  <div className='text-gray-500 text-sm'>-</div>
                  <li className='text-sm text-gray-500 cursor-text'>{item}</li>
                </div>
              ))}
            </ul>
          </span>
        </div>
      ))}
    </div>
  );
}
