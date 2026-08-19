import logoImage from '../../assets/logo-light.png'

export default function Logo({ onClick }) {
  return (
    <button type="button" className="hover:opacity-80 flex flex-row items-center justify-center text-left cursor-pointer" onClick={onClick}>
      <img src={logoImage} width={48} height={48} />
      <div className="flex flex-col">
        <span className="text-primary transition duration-205 text-sm font-semibold select-none">
          THE CURATED ARCHIVE
        </span>
        <span className="text-[12px] text-gray-500 block select-none text-left">
          RESEARCH REPOSITORY
        </span>
      </div>
    </button>
  )
}
