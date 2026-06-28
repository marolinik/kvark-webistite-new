import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import CornerDot from "@/components/common/CornerDot";
import DashedLine from "@/components/common/DashedLine";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="h-full min-h-screen flex items-center justify-center px-5 lg:px-16 py-24 lg:py-12 relative overflow-hidden bg-white">
      <div className="w-full max-w-4xl mx-auto relative z-10 px-0 lg:px-8 text-center">
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
        <DashedLine className="top-1 bottom-1 left-2 hidden lg:block" />
        <DashedLine className="top-1 bottom-1 right-2 hidden lg:block" />

        <div className="flex flex-col items-center gap-6 py-12">
          <h1 className="text-[8rem] lg:text-[12rem] font-bold text-neutral-900 leading-none">
            404
          </h1>
          <h2 className="text-[2rem] lg:text-[3rem] font-normal text-neutral-900 leading-[110%]">
            Page Not Found
          </h2>
          <p className="text-base lg:text-lg text-neutral-500 font-normal max-w-2xl">
            The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              variant="primary"
              size="medium"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
            <Button
              variant="outline"
              size="medium"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
