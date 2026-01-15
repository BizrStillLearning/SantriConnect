import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Calendar, FileText, BarChart3 } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary-accent" />,
      title: "Santri Management",
      description: "Manage all your santri data in one centralized platform with easy tracking and organization."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-accent" />,
      title: "Attendance Tracking",
      description: "Track attendance with ease and generate detailed reports for better monitoring."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary-accent" />,
      title: "Academic Records",
      description: "Keep track of academic performance and progress of each santri efficiently."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary-accent" />,
      title: "Advanced Analytics",
      description: "Gain insights with powerful analytics and reporting features for better decision-making."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-bg to-secondary-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your Pesantren</span>
                  <span className="block text-primary-accent mt-2">With Santri Connect</span>
                </h1>
                <p className="mt-3 text-base text-secondary-text sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Modern platform designed specifically for pesantren to manage santri data, track attendance, and monitor academic performance. Streamline your operations with our intuitive and powerful tools.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-accent hover:bg-accent-hover md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-accent bg-secondary-bg hover:bg-tertiary-bg md:py-4 md:text-lg md:px-10"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-r from-primary-accent to-secondary-accent sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-white">Dashboard Preview</h3>
              <p className="text-secondary-text mt-2">Interactive charts and data visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-primary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-accent tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Everything you need to manage your pesantren
            </p>
            <p className="mt-4 max-w-2xl text-xl text-secondary-text lg:mx-auto">
              Comprehensive tools designed specifically for pesantren administration
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-secondary-bg rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-tertiary-bg rounded-md shadow-sm">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-medium text-white tracking-tight">{feature.title}</h3>
                      <p className="mt-2 text-base text-secondary-text">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-accent to-secondary-accent">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your pesantren?</span>
            <span className="block text-sm font-normal mt-2 opacity-90">Join hundreds of pesantren already using Santri Connect</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-accent bg-white hover:bg-gray-100"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;