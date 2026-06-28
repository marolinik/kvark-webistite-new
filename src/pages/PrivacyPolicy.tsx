import Section from "@/components/common/Section";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";

function PrivacyPolicy() {
  return (
    <Section id="privacy-policy" className="relative">
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
            Privacy Policy for KVARK
          </h2>
          <p className="text-sm lg:text-base text-neutral-500">
            Last updated: December 23, 2025
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
            <div className="prose prose-neutral max-w-none">
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                This privacy policy notice is served by Egzakta Advisory Amsterdam B.V., with its registered seat at Barbara Strozzilaan 201, 1083HN Amsterdam, registration number: 92747175 ("KVARK" or "Controller"). The purpose of this policy is to explain to you how we control, process, handle and protect your personal information through the business and while you browse or use this website. If you do not agree to the following policy you may wish to cease viewing/using this website, and or refrain from submitting your personal data to us.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                KVARK ("we", "us", "our") respects your privacy and is committed
                to protecting personal data. This Privacy Policy explains how we
                collect, use, store, and protect personal information when you
                interact with{" "}
                <a
                  href="http://kvark.ai"
                  className="text-primary hover:text-primary-end transition-colors"
                >
                  http://kvark.ai
                </a>{" "}
                (the "Website") or communicate with us.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                By using the Website or contacting us, you agree to the
                practices described in this Privacy Policy.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                1. Information We Collect
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We only collect personal data that you voluntarily provide to
                us.
              </p>
              <h4 className="text-lg lg:text-xl font-semibold text-neutral-900 mt-4">
                Personal Information
              </h4>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We may collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>First name and last name</li>
                <li>Country and/or state/province</li>
              </ul>
              <h4 className="text-lg lg:text-xl font-semibold text-neutral-900 mt-4">
                Contact Information
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Email address</li>
                <li>Phone number</li>
              </ul>
              <h4 className="text-lg lg:text-xl font-semibold text-neutral-900 mt-4">
                Business Information
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Company name and related company information</li>
              </ul>
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 lg:p-6 mt-4">
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                  Important Note
                </h4>
                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                  KVARK does not offer user accounts or registration on the
                  Website. We do not collect usernames, passwords, or login
                  credentials.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                2. How We Collect Information
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We collect personal data when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Contact us via email</li>
                <li>Submit information through contact forms</li>
                <li>
                  Communicate with us for business, partnership, or inquiry
                  purposes
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                3. Purpose of Processing
              </h3>
              <h4 className="text-lg lg:text-xl font-semibold text-neutral-900 mt-4">
                Business purposes
              </h4>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We use collected information solely for legitimate business
                purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Responding to inquiries and requests</li>
                <li>Business communication and relationship management</li>
                <li>Providing information about KVARK services and updates</li>
                <li>Internal record-keeping and operational purposes</li>
              </ul>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                We do not use personal data for automated decision-making or
                profiling.
              </p>
              <h4 className="text-lg lg:text-xl font-semibold text-neutral-900 mt-6">
                New Offers
              </h4>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We also use your personal data to inform you about the latest offers, special deals, and other products or services that we believe may be of interest to you. The legal basis for processing is your consent, which you may withdraw at any time.
              </p>
              <h4 className="text-lg lg:text-xl font-semibold text-neutral-900 mt-6">
                Marketing Activities
              </h4>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We use your data for marketing purposes. These activities include the following: Using your contact details to regularly send you updates about products and services. You may quickly and easily unsubscribe from marketing emails at any time by simply clicking the "Unsubscribe" link. The legal basis for processing is your consent, which you may withdraw at any time.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                Based on your data, you may be shown personalized offers on the Website, in mobile applications, or on third-party websites/applications (including social networks), and the content of the Website displayed to you may be personalized. These may include offers that you can book directly through the Website or advertisers' websites, as well as offers or products from third parties that we believe may be of interest to you.
              </p>
              <h4 className="text-lg lg:text-xl font-semibold text-neutral-900 mt-6">
                Communication with you
              </h4>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                From time to time, we may contact you through other channels as well, such as email, postal mail, telephone or SMS, as well as other specialized communication applications (Viber, WhatsApp, Telegram). The method we choose will depend on the contact information you have previously shared with us. The legal basis for processing is your consent.
              </p>
              <h4 className="text-lg lg:text-xl font-semibold text-neutral-900 mt-6">
                Legal Purposes
              </h4>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Finally, in certain cases we may use your data to process and resolve legal disputes, for investigation and compliance purposes, to enforce the terms of use of the online reservation service, or to respond to lawful requests from public authorities. The legal basis for processing is our legitimate interest.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                Exceptionally, we may retain your data even after the withdrawal of consent or the fulfillment of the purpose, in situations where this is necessary for the performance of our legal obligations or for the establishment, exercise, or defense of legal claims.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                4. Legal Basis for Processing
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Where applicable under data protection laws (such as GDPR), we
                process personal data based on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Your consent</li>
                <li>Performance of a contract to which you are party or in order to take steps at the request of the data subject prior to entering into a contract</li>
                <li>
                  Legitimate business interests (e.g. responding to inquiries,
                  maintaining business communication)
                </li>
                <li>Compliance with legal obligations</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                5. Recipient or group of recipients
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Your personal data is shared internally within the company for the purpose of providing the services we offer. By accepting the Terms and Services, you acknowledge and agree that our partners may also use certain of your personal data.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We may also share your personal data with the following recipients:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Subcontractors, external consultants, lawyers, accountants, business banks, courier services, research and marketing agencies</li>
                <li>Information technology service providers, such as cloud providers, hosting companies, customer support services, chat services, or software companies</li>
                <li>A newly established entity or an acquiring entity, in the event the KVARK is involved in a merger, acquisition, sale of shares, or any other corporate restructuring</li>
                <li>Any other recipient where we are required to do so by law or by a court decision</li>
                <li>Any other recipient where reasonably necessary, for example in cases involving a threat to life</li>
              </ul>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                All recipients are required to implement appropriate technical, organizational, and personnel measures to protect your personal data. The Company has concluded data processing agreements with all recipients.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                6. Transfer of personal data to other countries
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Certain processors that may have access to personal data are located in foreign countries, primarily in Member States of the European Union or in countries that are parties to the Council of Europe Convention 108. The transfer of data to these countries is carried out on the basis of the presumed adequate level of protection of personal data in those countries, in accordance with the law.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                If certain processors are located outside the aforementioned group of countries, the transfer of data would be possible only in accordance with Article 46 of the GDPR, which regulates transfers subject to the application of appropriate safeguards.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                7. Data Retention
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We retain personal data only for as long as necessary to fulfill
                the purposes described in this Privacy Policy or to meet legal
                requirements. When data is no longer needed, it is securely
                deleted or anonymized.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                8. Data Security
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect personal data against unauthorized access, loss,
                misuse, or alteration. While no system can be guaranteed to be
                completely secure, we continuously improve our security
                practices.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                KVARK continuously undertakes appropriate security measures in order to protect your personal data in accordance with the GDPR. We implement appropriate physical, procedural, technical, organizational, and personnel measures in order to achieve an adequate level of protection of the personal data we process. KVARK, together with its partners, applies the best industry standards in data protection. This protection covers the loss of data, use contrary to the intended purpose, unauthorized access and disclosure, alteration, and destruction of such personal data. However, no security measure can guarantee that personal data will be 100% protected. Nevertheless, KVARK continuously improves all security measures through controlled processes and a high level of responsibility in order to ensure the protection of your personal data.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                Certain processors that may have access to personal data are located in foreign countries, primarily in Member States of the European Union or in countries that are parties to the Council of Europe Convention 108. The transfer of data to these countries is carried out on the basis of the presumed adequate level of protection of personal data in those countries, in accordance with the law. If certain processors are located outside the aforementioned group of countries, the transfer of data would be possible only in accordance with Article 46 of the GDPR, which regulates transfers subject to the application of appropriate safeguards.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                9. Your Rights
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-neutral-700">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-4">
                Requests can be submitted using the contact details below.
              </p>
              <div className="space-y-4 mt-6">
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">TRANSPARENCY</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    When you provide us with your personal data, we will transparently inform you about the purpose for which the specific data is required, who will use the data, and we will provide you with all other information relevant to the processing of your data (this right is fulfilled by providing you with access to this Privacy Policy).
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">RIGHT OF ACCESS</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    You have the right to be informed whether we process your personal data, and if we do, you have the right, following access, to request the correction, supplementation, updating, or deletion of the data, as well as the termination or temporary suspension of the processing. If we process your personal data as a data controller, you have the right to obtain from us all information regarding such processing.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">RIGHT TO RECTIFICATION, SUPPLEMENTATION, AND UPDATE</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    The data that is processed must be accurate and complete. You have the right to have inaccurate personal data corrected without undue delay and to have incomplete data supplemented.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">RIGHT TO ERASURE</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    You have the right to have your personal data erased in accordance with the GDPR. If it is necessary for us to continue processing in order to comply with our legal obligations (e.g., the Accounting Law and similar regulations) or for the establishment, exercise, or defense of legal claims, we will delete only the part of the data that is no longer necessary.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">RIGHT TO DATA PORTABILITY</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    If you wish (i) to receive the personal data you provided to us during registration in a structured, commonly used, and machine-readable format, or (ii) to have us transfer the personal data you provided to another controller, you have the right to request this from us, provided that the processing is based on consent or a contract and is carried out by automated means.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">RIGHT TO RESTRICTION OF PROCESSING</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    You have the right to request the restriction of the processing of your personal data in certain situations.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">RIGHT TO OBJECT</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    You have the right to object to the processing of your personal data where such processing is based on legitimate interest.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">RIGHT TO LODGE A COMPLAINT WITH THE COMPETENT AUTHORITY</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    You have the right to lodge a complaint with the competent authority.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">ALL OTHER RIGHTS PROVIDED BY LAW</h4>
                  <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                    The data subject may exercise their rights by submitting a request to the email address:{" "}
                    <a href="mailto:privacy@kvark.ai" className="text-primary hover:text-primary-end transition-colors">privacy@kvark.ai</a>. Regarding the exercise of the above rights, the Company will provide you with all necessary additional information and assistance, in accordance with the conditions and in the manner prescribed by the applicable Law on Personal Data Protection.
                  </p>
                </div>
              </div>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-6">
                We will respond to your request as soon as possible, and no later than within 30 days from the date of receipt of the request. In the event of complexity or a large number of requests, we may require additional time to respond. This period may not exceed 90 days, and you will be informed accordingly.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                If your request is manifestly unfounded or excessively repetitive, we may refuse to act on the request or charge a fee for fulfilling it. A request is considered repetitive if you submit a request to exercise the same right more than once within a single year. If you contact us two or more times within one year regarding the same right, we will respond to your request only if you have a justified reason.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                10. Children's Privacy
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                KVARK does not knowingly collect personal data from individuals
                under the age of 16. If such data is identified, it will be
                promptly deleted.
              </p>
            </div>

            {/* Section 11 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                11. Third-Party Links
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                The Website may contain links to third-party websites. We are
                not responsible for their privacy practices and encourage you to
                review their privacy policies independently.
              </p>
            </div>

            {/* Section 12 */}
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                12. Changes to This Privacy Policy
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </div>

            {/* Section 13 - Contact */}
            <div className="space-y-4 bg-neutral-50 border border-neutral-200 rounded-lg p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                13. Contact Information
              </h3>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                For privacy-related questions or requests, contact us at:
              </p>
              <div className="space-y-2">
                <p className="text-base lg:text-lg text-neutral-700">
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:privacy@kvark.ai"
                    className="text-primary hover:text-primary-end transition-colors"
                  >
                    privacy@kvark.ai
                  </a>
                </p>
                <p className="text-base lg:text-lg text-neutral-700">
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href="http://kvark.ai"
                    className="text-primary hover:text-primary-end transition-colors"
                  >
                    http://kvark.ai
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

export default PrivacyPolicy;
