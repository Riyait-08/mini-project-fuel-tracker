
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Fuel, TrendingUp, BarChart, Car } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
          <div className="container px-4 md:px-6 animate-fade-in">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-fuel-green/10 px-3 py-1 text-sm text-fuel-green-dark mb-4">
                  Smart Fuel Management
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-fuel-green-dark via-fuel-green to-fuel-green-light">
                  Track Your Fuel, Save More!
                </h1>
                <p className="mx-auto max-w-[700px] text-fuel-blue-dark md:text-xl dark:text-gray-400 mt-4">
                  Keep your car and wallet happy with our intuitive fuel tracking app.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 min-[400px]:flex-row">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-fuel-green-dark to-fuel-green">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-gradient-to-r from-fuel-green-dark to-fuel-green">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline">
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-fuel-neutral-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-fuel-blue-dark">
                  Smart Features for Smart Drivers
                </h2>
                <p className="mx-auto max-w-[700px] text-fuel-blue/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to track fuel expenses and improve efficiency.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm glass-card animate-fade-in">
                <div className="rounded-full bg-fuel-green/10 p-4">
                  <Fuel className="h-6 w-6 text-fuel-green-dark" />
                </div>
                <h3 className="text-xl font-bold text-fuel-blue-dark">Fuel Tracking</h3>
                <p className="text-fuel-blue/80 text-center">
                  Log every fuel purchase with price, amount, and location details.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="rounded-full bg-fuel-green/10 p-4">
                  <TrendingUp className="h-6 w-6 text-fuel-green-dark" />
                </div>
                <h3 className="text-xl font-bold text-fuel-blue-dark">Cost Analytics</h3>
                <p className="text-fuel-blue/80 text-center">
                  View detailed reports and analytics about your spending habits.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-full bg-fuel-green/10 p-4">
                  <BarChart className="h-6 w-6 text-fuel-green-dark" />
                </div>
                <h3 className="text-xl font-bold text-fuel-blue-dark">Smart Statistics</h3>
                <p className="text-fuel-blue/80 text-center">
                  Get insights into your fuel efficiency and cost-saving opportunities.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="rounded-full bg-fuel-green/10 p-4">
                  <Car className="h-6 w-6 text-fuel-green-dark" />
                </div>
                <h3 className="text-xl font-bold text-fuel-blue-dark">Multiple Vehicles</h3>
                <p className="text-fuel-blue/80 text-center">
                  Track multiple vehicles with separate histories and statistics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-fuel-green to-fuel-blue-light text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              Ready to Start Saving?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl mb-10">
              Join thousands of drivers who are saving money by tracking their fuel expenses.
            </p>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-fuel-green-dark hover:bg-white/90">
                  View Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" className="bg-white text-fuel-green-dark hover:bg-white/90">
                  Sign Up Now
                </Button>
              </Link>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
