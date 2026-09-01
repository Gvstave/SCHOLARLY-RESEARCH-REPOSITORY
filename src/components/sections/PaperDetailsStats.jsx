 

/**
 * PaperDetailsStats sub-component displaying download and citation counts.
 */
export default function PaperDetailsStats({ downloads, citations }) {
 return (
  <div className="border border-border p-5 space-y-3.5 bg-white/40 text-left">
   <h4 className="  text-primary">Stats</h4>
   <div className="grid grid-cols-2 gap-4 text-center divide-x divide-gray-100">
    <div>
     <p className="  text-primary  ">{downloads || 0}</p>
     <p className="   mt-0.5 ">Downloads</p>
    </div>
    <div>
     <p className="  text-primary  ">{citations || 0}</p>
     <p className="   mt-0.5 ">Citations</p>
    </div>
   </div>
  </div>
 );
}
