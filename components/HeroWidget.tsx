import React, { useState } from 'react';
import { Search, MapPin, Globe2, Plane } from 'lucide-react';
import { COUNTRIES } from '../constants';
import { SearchParams } from '../types';

interface HeroWidgetProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const HeroWidget: React.FC<HeroWidgetProps> = ({ onSearch, isLoading }) => {
  const [citizenship, setCitizenship] = useState('United Kingdom');
  const [residence, setResidence] = useState('United Kingdom');
  const [destination, setDestination] = useState('Finland');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ citizenship, residence, destination });
  };

  return (
    <div className="relative bg-slate-900 py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Travel background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60 mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Text Content */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Visa & Passport</span>
              <span className="block text-brand-500">Simple & Fast</span>
            </h1>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              The world's leading online travel visa and passport service. Check requirements, apply online, and travel with confidence.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>99.8% Approval Rate</span>
                <span className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>Secure Process</span>
              </div>
            </div>
          </div>

          {/* Widget Card */}
          <div className="mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full">
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Check Visa Requirements</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Citizenship */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      I am a citizen of
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        value={citizenship}
                        onChange={(e) => setCitizenship(e.target.value)}
                        className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg h-12 bg-gray-50"
                      >
                        {COUNTRIES.map(c => <option key={`cit-${c}`} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Residence */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currently living in
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        value={residence}
                        onChange={(e) => setResidence(e.target.value)}
                        className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg h-12 bg-gray-50"
                      >
                         {COUNTRIES.map(c => <option key={`res-${c}`} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Traveling to
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Plane className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg h-12 bg-gray-50"
                      >
                         {COUNTRIES.map(c => <option key={`dest-${c}`} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Checking Availability...
                      </span>
                    ) : (
                      "Get Visa Requirements"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon component since 'User' was used in Header and might conflict visually if not handled, though Lucide exports allow reuse.
// Using Globe here for 'Citizen' field icon just for variety, or reuse generic SVG.
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export default HeroWidget;
