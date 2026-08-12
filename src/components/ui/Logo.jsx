import logoImage from '../../assets/logo-light.png'

export default function Logo({ onClick }) {
  return (
    <button type="button" className="hover:opacity-80 flex flex-row items-center justify-center text-left cursor-pointer" onClick={onClick}>
      <img src={logoImage} width={64} height={64} className='mt-0.5' />
      <div className="flex flex-col">
        <span className="text-primary transition duration-205 text-sm md:text-md uppercase font-bold select-none">
          THE CURATED ARCHIVE
        </span>
        <span className="text-[10px] tracking-[0.28em] uppercase text-gray-500 block font-bold select-none text-left">
          RESEARCH REPOSITORY
        </span>
      </div>
    </button>
  )
}