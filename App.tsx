import React, { useState } from 'react';
import Header from './components/Header';
import HeroWidget from './components/HeroWidget';
import VisaResults from './components/VisaResults';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import { fetchVisaRequirements } from './services/geminiService';
import { SearchParams, VisaSearchResponse, AppState, VisaRequirement } from './types';
import { AlertCircle, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    citizenship: '',
    residence: '',
    destination: ''
  });
  const [visaData, setVisaData] = useState<VisaSearchResponse | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaRequirement | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setSearchParams(params);
    setAppState(AppState.LOADING);
    setErrorMsg(null);
    setVisaData(null);
    setSelectedVisa(null);

    // Scroll slightly down to acknowledge action
    window.scrollTo({ top: 100, behavior: 'smooth' });

    try {
      const data = await fetchVisaRequirements(
        params.citizenship,
        params.residence,
        params.destination
      );
      setVisaData(data);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setErrorMsg("We couldn't retrieve the visa information at this moment. Please check your internet connection or try again later.");
      setAppState(AppState.ERROR);
    }
  };

  const handleStartApplication = (visa: VisaRequirement) => {
    setSelectedVisa(visa);
    setAppState(AppState.APPLICATION);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplicationSubmit = () => {
    setAppState(AppState.SUCCESS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* Hero is hidden during application flow to focus user */}
        {(appState === AppState.HOME || appState === AppState.LOADING || appState === AppState.RESULTS || appState === AppState.ERROR) && (
             <HeroWidget 
             onSearch={handleSearch} 
             isLoading={appState === AppState.LOADING} 
           />
        )}

        {appState === AppState.ERROR && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {errorMsg}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {appState === AppState.RESULTS && visaData && (
          <VisaResults 
            data={visaData} 
            searchParams={searchParams} 
            onStartApplication={handleStartApplication}
          />
        )}

        {appState === AppState.APPLICATION && selectedVisa && (
          <ApplicationForm 
            visa={selectedVisa}
            searchParams={searchParams}
            onBack={() => setAppState(AppState.RESULTS)}
            onSubmit={handleApplicationSubmit}
          />
        )}

        {appState === AppState.SUCCESS && (
          <div className="max-w-3xl mx-auto px-4 py-24 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Application Submitted Successfully!</h2>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for your payment. We have received your visa application and transaction ID. 
              Our team will verify the payment and begin processing your documents immediately.
            </p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-left max-w-md mx-auto mb-10">
              <h4 className="font-bold text-slate-900 mb-2">Next Steps:</h4>
              <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                <li>You will receive a confirmation email shortly.</li>
                <li>A visa specialist will review your details within 2 hours.</li>
                <li>We may contact you via WhatsApp if additional info is needed.</li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setAppState(AppState.HOME);
                setVisaData(null);
                setSelectedVisa(null);
              }}
              className="px-8 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors"
            >
              Start Another Application
            </button>
          </div>
        )}
        
        {/* Features / Marketing section displayed only on Home state */}
        {appState === AppState.HOME && (
          <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  The smartest way to get your visa
                </p>
              </div>

              <div className="mt-20">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="pt-6">
                    <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8 h-full">
                      <div className="-mt-6">
                        <div className="inline-flex items-center justify-center p-3 bg-brand-500 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Fast Processing</h3>
                        <p className="mt-5 text-base text-gray-500">
                          We optimize every step of the application to ensure you get your documents as quickly as possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8 h-full">
                      <div className="-mt-6">
                        <div className="inline-flex items-center justify-center p-3 bg-brand-500 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Secure & Safe</h3>
                        <p className="mt-5 text-base text-gray-500">
                          Your data is encrypted and protected. We value your privacy and security above everything else.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8 h-full">
                      <div className="-mt-6">
                        <div className="inline-flex items-center justify-center p-3 bg-brand-500 rounded-md shadow-lg">
                           <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Global Coverage</h3>
                        <p className="mt-5 text-base text-gray-500">
                          Whether it's for tourism, business, or study, we cover visa requirements for over 200 countries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
