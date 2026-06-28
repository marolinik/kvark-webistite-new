import CornerDot from "@/components/common/CornerDot"
import DashedLine from "@/components/common/DashedLine"
import whiteSectionBackground from "@/assets/backgrounds/white-section-background.svg"

const WhiteSection = ({ children, }: { children: React.ReactNode }) => {
    return (
        <section className="h-full lg:h-screen flex items-end px-5 lg:px-16 py-24 lg:py-12 relative overflow-hidden text-neutral-900"
            style={{
                backgroundImage: `url(${whiteSectionBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center relative z-10 px-0 lg:px-8">
                <CornerDot className="top-0 left-1 hidden lg:block" />
                <CornerDot className="top-0 right-1 hidden lg:block" />
                <CornerDot className="bottom-0 left-1 hidden lg:block" />
                <CornerDot className="bottom-0 right-1 hidden lg:block" />
                <DashedLine
                    direction="horizontal"
                    gapSize={0}
                    dashSize={1}
                    className="top-1 left-1 right-1 hidden lg:block"
                />
                <DashedLine
                    direction="horizontal"
                    gapSize={0}
                    dashSize={1}
                    className="bottom-1 left-1 right-1 hidden lg:block"
                />
                <DashedLine
                    className="top-1 bottom-1 left-2 hidden lg:block"
                />
                <DashedLine
                    className="top-1 bottom-1 right-2 hidden lg:block"
                />

                {children}

            </div>
        </section>
    )
}

export default WhiteSection