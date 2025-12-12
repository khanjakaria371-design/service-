import React from 'react';
import { VisaSearchResponse, VisaRequirement } from '../types';
import { Clock, Calendar, DollarSign, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface VisaResultsProps {
  data: VisaSearchResponse;
  searchParams: { citizenship: string; residence: string; destination: string };
  onStartApplication: (visa: VisaRequirement) => void;
}

const VisaResults: React.FC<VisaResultsProps> = ({ data, searchParams, onStartApplication }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Visa Requirements for {searchParams.destination}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            For citizens of <span className="font-semibold text-brand-600">{searchParams.citizenship}</span> residing in <span className="font-semibold text-brand-600">{searchParams.residence}</span>.
          </p>
        </div>

        {/* Summary Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-12 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileCheck className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Visa Policy Summary</h3>
             </div>
             <p className="text-slate-600 leading-relaxed">{data.summary}</p>
          </div>
          {data.embassyInfo && (
            <div className="flex-1 md:border-l md:pl-6 border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                    <MapPinIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Embassy Information</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">{data.embassyInfo}</p>
            </div>
          )}
        </div>

        {/* Visa Cards */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {data.visas.map((visa, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              {/* Card Header */}
              <div className="bg-slate-50 p-6 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{visa.type}</h3>
                    <p className="text-sm text-slate-500 mt-1">{visa.description}</p>
                  </div>
                  {visa.eligibilityScore > 80 && (
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                       Popular
                     </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1">
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Clock className="w-5 h-5 text-slate-400 mr-3" />
                    <span className="text-slate-500 w-24">Processing:</span>
                    <span className="font-medium text-slate-900">{visa.processingTime}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-5 h-5 text-slate-400 mr-3" />
                    <span className="text-slate-500 w-24">Validity:</span>
                    <span className="font-medium text-slate-900">{visa.validity}</span>
                  </div>
                   <div className="flex items-center text-sm">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 mr-3" />
                    <span className="text-slate-500 w-24">Entries:</span>
                    <span className="font-medium text-slate-900">{visa.entries}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-5 h-5 text-slate-400 mr-3" />
                    <span className="text-slate-500 w-24">Govt Fee:</span>
                    <span className="font-medium text-slate-900">{visa.estimatedFee}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Required Documents</h4>
                  <ul className="space-y-2">
                    {visa.requirements.slice(0, 4).map((req, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600">
                        <span className="mr-2 text-brand-500 mt-1">•</span>
                        {req}
                      </li>
                    ))}
                    {visa.requirements.length > 4 && (
                        <li className="text-xs text-brand-600 font-medium pl-3 pt-1">
                            +{visa.requirements.length - 4} more documents
                        </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 mt-auto">
                <button 
                  onClick={() => onStartApplication(visa)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                >
                  Start Application
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Info Banner */}
        <div className="mt-16 bg-blue-900 rounded-3xl p-8 sm:p-12 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Need help with your application?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Our team of visa experts reviews every application to ensure it's error-free before submission. We handle the bureaucracy so you can focus on your trip.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button className="px-8 py-3 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                    Contact Support
                 </button>
                 <button className="px-8 py-3 bg-blue-800 text-white border border-blue-700 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                    Track Existing Order
                 </button>
            </div>
        </div>

      </div>
    </div>
  );
};

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

export default VisaResults;
