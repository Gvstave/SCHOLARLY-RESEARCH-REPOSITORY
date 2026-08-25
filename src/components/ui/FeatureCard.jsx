const FeatureCard = ({ title, description }) => {
  return (
    <div key={title} className="space-y-3 text-left">
      <div className="flex items-center gap-2.5">
        <h2 className=" text-primary sm: ">
          {title}
        </h2>
      </div>
      <p className="   ">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard;