const FeatureCard = ({ title, description, image, reverse = false }) => {
  return (
    <div className="grid grid-cols-1 items-center gap-6 border-t border-gray-100 pt-8 text-left md:grid-cols-2 md:gap-12">
      <div className={reverse ? 'md:order-2' : 'md:order-1'}>
        <img
          src={image.src}
          alt={image.alt}
          className="aspect-4/3 w-full object-cover"
        />
      </div>
      <div className={reverse ? 'md:order-1' : 'md:order-2'}>
        <h2 className="text-primary">
          {title}
        </h2>
        <p className="mt-3">
          {description}
        </p>
      </div>
    </div>
  )
}

export default FeatureCard;