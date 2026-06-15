import Image from "next/image";

const Support = () => {
  return (
    <section className="bg-gradient-to-br from-white via-slate-50 to-blue-50 py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="order-2 lg:order-1">

            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              💬 Need Help?
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Talk To Our
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Learning Experts
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl">
              Whether you're facing technical issues, need help choosing
              the right course, or have questions about your learning path,
              our team is always here to guide you.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-3">

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                  ✓
                </div>
                <span className="text-slate-700 font-medium">
                  Quick response from our support team
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                  ✓
                </div>
                <span className="text-slate-700 font-medium">
                  Course and technical guidance
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                  ✓
                </div>
                <span className="text-slate-700 font-medium">
                  Dedicated learner support
                </span>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <button className="rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-700 hover:-translate-y-1">
                Contact Us
              </button>

              <button className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-100">
                Schedule Call
              </button>

            </div>

          </div>

          {/* Right Image */}
          <div className="relative flex justify-center order-1 lg:order-2">

            {/* Decorative Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[400px] w-[400px] rounded-full bg-blue-100 blur-3xl opacity-60"></div>
            </div>

            {/* Image Card */}
            <div className="relative">

              <Image
                src="/assets/images/support1.png"
                alt="Support"
                width={500}
                height={500}
                className="w-full max-w-md object-contain"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Support;