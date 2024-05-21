import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
};

const data: Array<{
  icon: keyof typeof dynamicIconImports;
  title: string;
  content: string
}> = [
  {
    'icon': 'activity',
    title: 'Acolhimento',
    content: 'Acolhimento é um dos mais importantes aspectos da mente. É o que acontece quando a mente está em um estado de acordo com o seu comportamento.'
  },
  {
    'icon': 'activity',
    title: 'Comprometimento',
    content: 'Tenha o suporte para manter a dedicação e a determinação alinhadas com seus objetivos e valores pessoais. Reforce sua seriedade e empenho em seguir seu caminho rumo à realização e ao sucesso na vida com comprometimento.'
  },
  {
    'icon': 'activity',
    title: 'Profissionalismo',
    content: 'Descubra nossa excepcional grade de psicólogos altamente qualificados, prontos para oferecer apoio emocional e orientação personalizada. Com profundo conhecimento e empatia, nossa classe de psicólogos está comprometida em ajudá-lo a alcançar bem-estar mental e equilíbrio emocional. Invista em seu crescimento pessoal com o suporte de profissionais dedicados à sua saúde mental.'
  }
];

export default function Ethics() {
  return (
    <section className='px-24 max-md:px-5'>
        <div className='max-w-xl max-md:mb-10'>
          <h2 className='text-3xl font-bold sm:text-4xl'>
            O valor de uma mente bem cuidada!
          </h2>
        </div>
        <div className='mt-4 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3'>
          {data.map((item, index) => (
            <div key={index} className='flex items-start gap-4'>
              <span className='shrink-0 rounded-lg bg-primary p-4'>
                <Icon name={item.icon} className=' text-white' />
              </span>
              <div>
                <h2 className='text-lg font-bold'>{item.title}</h2>
                <p className='mt-2 text-sm text-gray-500'>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}
