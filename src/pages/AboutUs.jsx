 
import FeatureCard from '../components/ui/FeatureCard';
import features from '../constants/feature';

export default function AboutUs() {
 return (
  <div className="px-4 sm:px-8 lg:px-8 py-8 text-primary selection:bg-gray-100 max-w-4xl mx-auto">
   <div className="space-y-12">
    {/* Header Section */}
    <div className="space-y-4 border-b border-border pb-8 text-left">
     <div className='inline-flex items-center gap-2 '>
      <h2 className='text-black '>Having an issue or need your work removed? <a href="mailto:ilungagustave73@gmail.com" className='text-blue-500'>Contact Admin</a></h2>
     </div>
     <h1 className="  sm:  text-primarymy-2">
      The Curated Archive
     </h1>
     <p className="    max-w-3xl">
      A quiet, focused repository of academic and scientific literature spanning Zambian universities and independent research groups. All hosted papers are preprint research papers. Administrators curate the repository, checking submissions to identify formatting issues and errors, while enabling readers to engage directly with authors.
     </p>
    </div>

    {/* Feature Grid */}
    <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3">
     {features.map((item) => (
      <FeatureCard {...item} />
     ))}
    </div>

    {/* Context and Purpose */}
    <div className="space-y-4 pt-8 border-t border-gray-100 text-left">
     <h2 className="   sm:  text-primary">Why we built this</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <p className="   ">
       Scientific publishing is often locked behind cost paywalls or lost in complex university systems. The Curated Archive offers a simple, quiet place to share and view research papers directly without distraction.
      </p>
      <p className="   ">
       By providing easy open access, university affiliation search, and simple checks for errors, we support a friendly, non-commercial environment where scholars can focus on discovering, discussing, and improving great research.
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}

