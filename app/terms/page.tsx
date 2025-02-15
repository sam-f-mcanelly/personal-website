import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen text-slate-950 relative z-10 dark:text-slate-50 ">
      <main className="container px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Terms of Service</h1>
        <div className="space-y-4 text-white">
          <p>
            Welcome to Sam McAnelly&apos;s portfolio website. By accessing this website, you agree
            to be bound by these Terms of Service.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2 text-neutral-subheading">
            1. Use of the Website
          </h2>
          <p>
            This website is provided for informational purposes only. You may not use this website
            for any unlawful purpose or in any way that could damage, disable, overburden, or impair
            our servers or networks.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2 text-neutral-subheading">
            2. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the
            property of Sam McAnelly and protected by copyright laws. You may not reproduce,
            distribute, or use any content from this website without explicit permission.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2 text-neutral-subheading">3. Disclaimer</h2>
          <p>
            This website is provided &quot;as is &quot; without any representations or warranties,
            express or implied. Sam McAnelly makes no representations or warranties in relation to
            this website or the information and materials provided on this website.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2 text-neutral-subheading">
            4. Limitation of Liability
          </h2>
          <p>
            Sam McAnelly will not be liable to you in relation to the contents of, or use of, or
            otherwise in connection with, this website for any indirect, special or consequential
            loss; or for any business losses, loss of revenue, income, profits or anticipated
            savings, loss of contracts or business relationships, loss of reputation or goodwill, or
            loss or corruption of information or data.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2 text-neutral-subheading">
            5. Changes to These Terms
          </h2>
          <p>
            Sam McAnelly reserves the right to modify these Terms of Service at any time. We will
            post any changes on this page and update the &quot;Last updated &quot; date below.
          </p>
          <p className="mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <footer className="border-t border-white/20 bg-black/40 backdrop-blur-md mt-8">
        <div className="container flex justify-center py-4">
          <Link
            href="/"
            className="text-xs hover:underline underline-offset-4 text-neutral-heading"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
