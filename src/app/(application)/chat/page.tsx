import Image from 'next/image';

import WALLPAPER from '@/public/images/wallpaper-whatsapp-background.png';

export default async function ChatScreen() {
  return (
    <Image
      src={WALLPAPER}
      alt='wallpaper'
      className='w-full invert opacity-5 object-cover absolute'
    />
  );
}
