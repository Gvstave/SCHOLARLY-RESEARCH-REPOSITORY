const FeatureCard = ({ title, description, icon: Icon, iconColor }) => {
    return (
        <div key={title} className="space-y-3 text-left">
            <div className="flex items-center gap-2.5">
                <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />
                <h3 className="font-sans text-lg font-semibold tracking-tight text-primary sm:text-xl">
                    {title}
                </h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                {description}
            </p>
        </div>
    )
}

export default FeatureCard;