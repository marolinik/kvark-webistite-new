import ImageWithPlaceholder from "./ImageWithPlaceholder";

interface SecurityCardProps {
    logo: string;
    name: string;
    description: string;
}

function SecurityCard({ logo, name, description }: SecurityCardProps) {
    return (
        <a
            className="flex flex-row items-center p-1.5 gap-2 w-full border border-neutral-50 rounded-[2.5rem] transition-transform duration-300"
        >
            <div className="flex flex-col items-start w-full h-full bg-neutral-25 border border-neutral-100 rounded-[2.25rem] overflow-hidden">
                {/* Logo/Image Section */}
                <div className="w-full bg-neutral-25 flex items-center justify-center relative overflow-hidden">
                    {/* Logo */}
                    <div className="relative z-10 w-full h-full">
                        <ImageWithPlaceholder src={logo} alt={name} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Text Section */}
                <div className="flex flex-col items-center py-8 px-10 gap-3 w-full h-full max-h-[35%] bg-neutral-0">
                    <h3 className="font-normal text-[2rem] leading-9 text-center tracking-[-0.01em] text-neutral-900 w-full">
                        {name}
                    </h3>
                    <p className="font-normal text-base leading-[150%] text-center text-neutral-500">
                        {description}
                    </p>
                </div>
            </div>
        </a>
    );
}

export default SecurityCard;
