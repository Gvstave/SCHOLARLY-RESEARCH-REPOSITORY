export default function Logo({onClick}){
    return(
        <button type="button" className="flex flex-col text-left cursor-pointer" onClick={onClick}>
            <span className="text-primary hover:opacity-90 transition duration-205 text-sm md:text-md uppercase font-bold tracking-[0.22em] leading-tight select-none">
              THE CURATED ARCHIVE
            </span>
            <span className="text-[8px] tracking-[0.28em] uppercase text-gray-500 mt-1 block font-bold select-none text-left">
              RESEARCH REPOSITORY
            </span>
          </button>
    )
}