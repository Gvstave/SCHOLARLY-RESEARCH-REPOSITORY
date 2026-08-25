import logoImage from '../../assets/logo-light.png'

export default function Logo({ onClick }) {
 return (
  <button type="button" className="hover:opacity-80 flex flex-row items-center justify-center text-left cursor-pointer" onClick={onClick}>
   <img src={logoImage} width={48} height={48} />
   <div className="flex flex-col text-primary ">
    <span className="text-sm leading-[1.125] transition duration-205 select-none font-bold">
     THE CURATED ARCHIVE
    </span>
    <span className="block text-xs leading-none select-none text-left">
     RESEARCH REPOSITORY
    </span>
   </div>
  </button>
 )
}
