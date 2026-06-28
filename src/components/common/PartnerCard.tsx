import { pushEvent } from "@/utils/gtm";

interface PartnerCardProps {
  logo: string;
  name: string;
  description: string;
  url: string;
}

function PartnerCard({ logo, name, description, url }: PartnerCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row items-center p-1.5 gap-2 w-full border border-neutral-50 rounded-[2.5rem] transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => pushEvent({ event: "partner_card_click", partner_name: name, url })}
    >
      <div className="flex flex-col items-start w-full h-full bg-neutral-25 border border-neutral-100 rounded-[2.25rem] overflow-hidden">
        {/* Logo/Image Section */}
        <div className="w-full h-75 bg-neutral-25 flex items-center justify-center relative overflow-hidden">
          {/* Decorative blur effects */}
          <div className="absolute w-[104px] h-[104px] bg-primary-500 opacity-60 blur-[67px] top-[40%] right-[10%]" />
          <div className="absolute w-[104px] h-[104px] bg-primary-500 opacity-60 blur-[67px] top-[25%] left-[35%]" />
          <div className="absolute w-[104px] h-[104px] bg-primary-500 opacity-60 blur-[67px] bottom-[20%] left-[10%]" />

          {/* Logo */}
          <div className="relative z-10 w-full h-full">
            <img src={logo} alt={name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center py-8 px-10 gap-3 w-full bg-neutral-0">
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

export default PartnerCard;
