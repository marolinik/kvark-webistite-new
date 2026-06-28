import Section from "@/components/common/Section";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";

function TermsOfService() {
  return (
    <Section id="terms-of-service" className="relative">
      <div className="min-h-screen flex flex-col pb-8 pt-30 lg:pt-40 px-10 lg:px-20 gap-5 lg:gap-10 relative">
        {/* Vertical dashed lines on left and right */}
        <DashedLine
          direction="vertical"
          color="#E2E8F0"
          className="hidden lg:block lg:left-21"
        />
        <DashedLine
          direction="vertical"
          color="#E2E8F0"
          className="hidden lg:block lg:right-21"
        />

        <div className="flex flex-col gap-4 mb-6 w-full text-center px-4 lg:px-40">
          <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal leading-[100%] text-neutral-900">
            Website Terms and Services
          </h2>
          <p className="text-sm lg:text-base text-neutral-500">
            Last Updated: December 23, 2025
          </p>
        </div>

        <div className="flex flex-col gap-8 justify-center items-center pb-20 px-4 lg:px-40 relative pt-5 lg:pt-10">
          {/* Dashed line at the top */}
          <DashedLine
            direction="horizontal"
            color="#E2E8F0"
            className="hidden lg:block top-0"
          />

          {/* Corner Dots - centered on dashed lines */}
          <CornerDot
            className="hidden lg:block top-0 left-0 -translate-y-1/2 z-20"
            variant="light"
          />
          <CornerDot
            className="hidden lg:block top-0 right-0 -translate-y-1/2 z-20"
            variant="light"
          />
          <CornerDot
            className="hidden lg:block bottom-0 left-0 translate-y-1/2 z-20"
            variant="light"
          />
          <CornerDot
            className="hidden lg:block bottom-0 right-0 translate-y-1/2 z-20"
            variant="light"
          />

          {/* Content */}
          <div className="w-full max-w-4xl text-left space-y-8">
            <div className="prose prose-neutral max-w-none space-y-5">
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                These Terms and Services ("Terms") govern your access to and use
                of the website{" "}
                <a
                  href="http://kvark.ai"
                  className="text-primary hover:text-primary-end transition-colors"
                >
                  http://kvark.ai
                </a>{" "}
                (the "Website").
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-2!">
                Overview
              </h3>

              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                The kvark.ai website ("Website") is the exclusive property of
                the company Egzakta Advisory Amsterdam B.V., with its
                registered seat at Barbara Strozzilaan 201, 1083HN Amsterdam,
                ID number: 92747175-20260226-O001, (referred to herein as
                "Egzakta" or "the Company"). [MM1.1]
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                This website is designed as our web presentation which provides
                you with information about our products and services, new
                versions, designs, upgrades and keeps you up to date with our
                products and activities. By accessing or using Website, you
                acknowledge that you have read, understood, and agreed to these
                Terms and any policies incorporated herein by reference. If you
                do not accept these Terms in their entirety, you are prohibited
                from using the Website, and any continued access or use will
                constitute your acceptance of these Terms.
              </p>

              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                By using the Website, you acknowledge and agree to the Privacy
                Policy, which outlines how we collect, use, and protect your
                data [MM2.1].
              </p>

              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                KVARK [MM3.1] ("we", "us", "our") operates this Website solely
                as an informational platform to present our services and to
                allow users to submit inquiries related to demonstrations,
                partnerships, and employment opportunities. KVARK does not
                provide software, platforms, or services through this Website.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                1. Purpose of the Website
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                The Website is intended exclusively for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Providing information about KVARK and its offerings</li>
                <li>Receiving inquiries for demos or business partnerships</li>
                <li>Receiving applications for employment opportunities</li>
              </ul>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                The Website does not provide:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>User accounts or registration</li>
                <li>Access to software, AI models, or systems</li>
                <li>SaaS, APIs, or hosted services</li>
              </ul>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                Any products or services offered by KVARK are governed solely by
                separate written agreements.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                This website is for informational purposes only and enables
                visitors to establish contact with the Company. The Website
                does not constitute an offer nor an invitation to make an
                offer, but serves solely as a communication channel through
                which interested parties may contact the Company for the
                purpose of future negotiations and the potential establishment
                of business cooperation.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                2. Permitted Use
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                You agree to use the Website only for lawful purposes and in a
                manner consistent with its intended purpose.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                You must not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>
                  Use the Website for unlawful, misleading, or fraudulent
                  activities
                </li>
                <li>
                  Attempt to gain unauthorized access to the Website or its
                  infrastructure
                </li>
                <li>
                  Introduce malicious code or interfere with Website
                  functionality
                </li>
                <li>Use automated tools to extract data without permission</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                3. Submissions and Communications
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                By submitting information through the Website (including demo
                requests, partnership inquiries, or job applications), you
                confirm that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>The information provided is accurate and lawful</li>
                <li>You have the right to submit such information</li>
                <li>
                  KVARK may use the information solely to respond to your
                  inquiry or application
                </li>
              </ul>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                Submission of information does not create a contractual
                relationship, Company shall not be obliged to provide answers
                to all inquiries.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                4. Intellectual Property
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Except as expressly set out in these Terms, all intellectual
                property rights in and to KVARK and Licensed Content are the
                exclusive property of Egzakta and its licensors. By providing
                suggestions, ideas, enhancement requests, or feedback related
                to the Service or products, you irrevocably assign all
                associated rights to Egzakta. Egzakta owns all content, data,
                software, inventions, ideas and other technology and
                intellectual property that it develops in connection with the
                Service and its products.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                All content, materials, logos, and trademarks within the
                Website are the property of Egzakta. Unauthorized use,
                reproduction, or distribution of Egzakta&apos;s logos or
                trademarks is strictly prohibited.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                You may view and use Website content for personal or internal
                business informational purposes only. Any other use requires
                prior written consent.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                5. Third-Party Links
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                The Website may contain links to third-party websites. KVARK is
                not responsible for the content, availability, or practices of
                those third-party sites. Accessing third-party websites is at
                your own risk.[MM4.1]
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                6. No Warranties
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                The Website and its content are provided "as is" and "as
                available."
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                KVARK makes no warranties or representations regarding:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Accuracy or completeness of Website content</li>
                <li>Availability or uninterrupted operation</li>
                <li>Suitability of information for any particular purpose</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                7. Limitation of Liability
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>
                  KVARK shall not be liable for any indirect, incidental, or
                  consequential damages arising from Website use
                </li>
                <li>
                  KVARK shall not be liable for decisions made based on Website
                  content
                </li>
              </ul>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                Your sole remedy is to discontinue use of the Website.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                8. Privacy
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Use of the Website is also governed by our Privacy Policy, which
                explains how personal data is collected and processed. By using
                the Website, you consent to such processing.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                9. Changes to the Website and Terms
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                KVARK may modify or discontinue the Website or update these
                Terms at any time without prior notice. Updated Terms will be
                posted on the Website with a revised date.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                10. Governing Law
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of the Netherlands. Any dispute, controversy or
                claim arising out of or in connection with these Terms shall be
                subject to the exclusive jurisdiction of the competent courts
                of the Netherlands.
              </p>
            </div>

            {/* Section 11 - Contact */}
            <div className="space-y-4 bg-neutral-50 border border-neutral-200 rounded-lg p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                11. Contact Information
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                For questions regarding these Terms:
              </p>
              <div className="space-y-2">
                <p className="text-base lg:text-lg text-neutral-700">
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href="http://kvark.ai"
                    className="text-primary hover:text-primary-end transition-colors"
                  >
                    http://kvark.ai
                  </a>
                </p>
                <p className="text-base lg:text-lg text-neutral-700">
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:legal@kvark.ai"
                    className="text-primary hover:text-primary-end transition-colors"
                  >
                    legal@kvark.ai
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Dashed line at the bottom */}
          <DashedLine
            direction="horizontal"
            color="#E2E8F0"
            className="hidden lg:block bottom-0"
          />
        </div>
      </div>
    </Section>
  );
}

export default TermsOfService;
