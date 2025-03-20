import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D942C] to-[#167623] py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Roberto Save Dreams Foundation
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Empowering communities and transforming lives across Africa through education, microloans, and sustainable development initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-block bg-white text-[#1D942C] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/programs"
              className="inline-block bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Our Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to creating sustainable solutions that empower communities and preserve dreams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#1D942C] mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-6">
                To provide resources, education, and financial support to underprivileged communities in Africa, 
                enabling them to build sustainable livelihoods and break the cycle of poverty.
              </p>
              <h3 className="text-2xl font-bold text-[#1D942C] mb-4">Our Vision</h3>
              <p className="text-gray-700">
                A world where every person has the opportunity to fulfill their potential, where dreams are 
                nurtured not abandoned, and where communities thrive through sustainable development and empowerment.
              </p>
            </div>
            <div className="bg-[#1D942C]/10 p-8 rounded-2xl">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1D942C]">120+</p>
                    <p className="text-sm text-gray-600">Microloans Provided</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1D942C]">300+</p>
                    <p className="text-sm text-gray-600">Entrepreneurs Supported</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1D942C]">15+</p>
                    <p className="text-sm text-gray-600">Communities Reached</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1D942C]">85%</p>
                    <p className="text-sm text-gray-600">Repayment Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we're making a difference through our integrated approach to sustainable development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Microloan Initiative",
                description: "Providing small business loans to entrepreneurs to start or grow sustainable businesses.",
                icon: "💼",
                link: "/programs#microloans"
              },
              {
                title: "Education Support",
                description: "Funding education for children and young adults through scholarships and school resources.",
                icon: "📚",
                link: "/programs#education"
              },
              {
                title: "Community Development",
                description: "Building essential infrastructure and facilities to improve community well-being.",
                icon: "🏘️",
                link: "/programs#community"
              }
            ].map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-8">
                  <div className="text-4xl mb-4">{program.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <Link
                    href={program.link}
                    className="text-[#1D942C] font-medium hover:text-[#167623] flex items-center"
                  >
                    Learn more
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-block bg-[#1D942C] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#167623] transition-colors"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-[#1D942C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Your support can transform lives and communities. Together, we can create lasting positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-block bg-white text-[#1D942C] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 