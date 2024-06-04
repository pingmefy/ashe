import Image from 'next/image';
export const Navbar = () => {
  return(
    <div className={`flex flex-row p-4 w-full justify-center items-center bg-primaryColorDark`}>
      <Image src="/logo.png" alt="Logo" width={160} height={57} />
    </div>
  )
}
