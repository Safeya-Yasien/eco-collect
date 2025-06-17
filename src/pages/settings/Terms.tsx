const Terms = () => {
  return (
    <div className="p-0 mt-8 mb-12">
      <h4 className="text-xl text-[#2E7D32] mb-4 underline">
        Terms &amp; Conditions:
      </h4>
      <p className="mb-4 text-gray-700">
        Welcome to EcoCollect! By using our platform, you agree to the following
        terms and conditions. Please read them carefully.
      </p>
      <ol className="list-decimal list-inside space-y-4 text-gray-800">
        <li>
          <span className="font-semibold">Account Responsibility:</span> You are
          responsible for maintaining the confidentiality of your account and
          password and for restricting access to your account.
        </li>
        <li>
          <span className="font-semibold">Service Usage:</span> EcoCollect is
          provided for personal and community waste management purposes. Any
          misuse or unauthorized use is strictly prohibited.
        </li>
        <li>
          <span className="font-semibold">Data Privacy:</span> We respect your
          privacy. Your personal information will be handled according to our
          Privacy Policy and will not be shared without your consent.
        </li>
        <li>
          <span className="font-semibold">Content Ownership:</span> All content,
          trademarks, and data on this platform are the property of EcoCollect
          or its licensors. Unauthorized use is not permitted.
        </li>
        <li>
          <span className="font-semibold">User Conduct:</span> Users must not
          post or transmit any unlawful, threatening, defamatory, or otherwise
          objectionable material.
        </li>
        <li>
          <span className="font-semibold">Service Changes:</span> We reserve the
          right to modify or discontinue the service at any time without notice.
        </li>
        <li>
          <span className="font-semibold">Limitation of Liability:</span>
          EcoCollect is not liable for any damages arising from the use or
          inability to use the platform.
        </li>
        <li>
          <span className="font-semibold">Governing Law:</span> These terms are
          governed by the laws of your country or region.
        </li>
      </ol>
      <p className="mt-8 text-gray-600 text-sm">
        If you have any questions about these terms, please contact us at{" "}
        <a
          href="mailto:support@ecocollect.com"
          className="text-[#2E7D32] underline"
        >
          support@ecocollect.com
        </a>
        .
      </p>
    </div>
  );
};

export default Terms;
