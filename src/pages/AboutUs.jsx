 
import FeatureCard from '../components/ui/FeatureCard';
import features from '../constants/feature';
import archiveImage from '../assets/images/orig.avif';
import collaborationImage from '../assets/images/origy.avif';
import formatsImage from '../assets/images/download.svg';

const featureImages = [
 { src: archiveImage, alt: 'Research papers prepared for review' },
 { src: collaborationImage, alt: 'Researchers collaborating around a desk' },
 { src: formatsImage, alt: 'Digital research documents and file formats' },
];

export default function AboutUs() {
 return (
  <div className="px-4 sm:px-8 lg:px-8 py-8 text-primary selection:bg-gray-100 max-w-7xl mx-auto">
   <div className="space-y-12">
    {/* Header Section */}
    <div className="space-y-4 border-b border-border pb-8 text-center">
     <div className='inline-flex items-center gap-2 '>
      <h3 className='text-black'>Having an issue or need your work removed? <a href="mailto:ilungagustave73@gmail.com" className='text-blue-500'>Contact Admin</a></h3>
     </div>
     <h1 className="text-primary my-2">
      The Curated Archive
     </h1>
     <p className="">
      A quiet, focused repository of academic and scientific literature spanning Zambian universities and independent research groups. All hosted papers are preprint research papers. Administrators curate the repository, checking submissions to identify formatting issues and errors, while enabling readers to engage directly with authors.
     </p>
    </div>

    {/* Feature Grid */}
    <div className="space-y-10 pt-4">
    {features.map((item, index) => (
     <FeatureCard
      key={item.title}
      {...item}
      image={featureImages[index]}
      reverse={index % 2 === 1}
     />
     ))}
    </div>

    {/* Context and Purpose */}
    <div className="space-y-4 pt-8 border-t border-gray-100 text-left">
     <h2 className="text-primary">Why we built this</h2>
     <div>
      <p>
       Scientific publishing is often locked behind cost paywalls or lost in complex university systems. The Curated Archive offers a simple, quiet place to share and view research papers directly without distraction.
      </p>
      <p>
       By providing easy open access, university affiliation search, and simple checks for errors, we support a friendly, non-commercial environment where scholars can focus on discovering, discussing, and improving great research.
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}

