import Image from 'next/image';

import WALLPAPER from '@/public/images/wallpaper-whatsapp-background.png';

export default function InitialChatScreen() {
  return (
    <div className='w-full h-full relative overflow-hidden'>
      <Image
        src={WALLPAPER}
        alt='wallpaper'
        className='w-full invert opacity-5 object-cover absolute'
      />
    </div>
  );
}
