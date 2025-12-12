import React, { useState } from 'react';
import { VisaRequirement, SearchParams } from '../types';
import { ArrowLeft, Lock, ShieldCheck, Copy, Check, CreditCard, Wallet } from 'lucide-react';

interface ApplicationFormProps {
  visa: VisaRequirement;
  searchParams: SearchParams;
  onBack: () => void;
  onSubmit: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ visa, searchParams, onBack, onSubmit }) => {
  const [copied, setCopied] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const SERVICE_FEE = 45; // Fixed service fee in USD
  const binanceId = "1043944609";

  // Parse estimated fee to number for total calculation (simple fallback logic)
  const estimatedFeeNum = parseInt(visa.estimatedFee.replace(/[^0-9]/g, '')) || 80; 
  const total = estimatedFeeNum + SERVICE_FEE;

  const handleCopy = () => {
    navigator.clipboard.writeText(binanceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={onBack} className="flex items-center text-slate-500 hover:text-brand-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </button>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          
          {/* LEFT COLUMN - Form */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Secure Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Contact Info */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold mr-3">1</div>
                  <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input required type="text" className="w-full h-12 rounded-lg border-slate-300 focus:ring-brand-500 focus:border-brand-500" placeholder="e.g. John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input required type="text" className="w-full h-12 rounded-lg border-slate-300 focus:ring-brand-500 focus:border-brand-500" placeholder="e.g. Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input required type="email" className="w-full h-12 rounded-lg border-slate-300 focus:ring-brand-500 focus:border-brand-500" placeholder="john@example.com" />
                    <p className="mt-1 text-xs text-slate-500">We will send your visa updates to this email.</p>
                  </div>
                   <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (WhatsApp preferred)</label>
                    <input required type="tel" className="w-full h-12 rounded-lg border-slate-300 focus:ring-brand-500 focus:border-brand-500" placeholder="+1 234 567 890" />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold mr-3">2</div>
                  <h2 className="text-xl font-semibold text-slate-900">Payment Method</h2>
                </div>

                {/* Binance Payment Box */}
                <div className="border-2 border-brand-500 bg-brand-50 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold uppercase">
                        Recommended
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white rounded-full shadow-sm">
                           {/* Generic Wallet/Crypto Icon */}
                           <svg className="w-6 h-6 text-[#F3BA2F]" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#F3BA2F"/>
                             <path d="M12.003 6.375L9.36 9.016l2.643 2.643 2.64-2.643-2.64-2.64zM9.018 9.358L6.377 12l2.64 2.64 2.642-2.64-2.64-2.642zm2.985 5.626l2.64-2.64 2.642 2.64-2.64 2.643-2.642-2.643zm2.982-5.626l2.64 2.642-2.64 2.64-2.642-2.64 2.642-2.642zM12.003 14.36l-2.643 2.642 2.643 2.643 2.64-2.643-2.64-2.642z" fill="white"/>
                           </svg>
                        </div>
                        <span className="font-bold text-lg text-slate-900">Binance Pay / Crypto Transfer</span>
                    </div>
                    
                    <p className="text-sm text-slate-700 mb-4">
                        To complete your application securely, please transfer the total amount of <strong>${total.toFixed(2)} USD</strong> to the Binance ID below.
                    </p>

                    <div className="bg-white border border-slate-300 rounded-lg p-4 flex items-center justify-between mb-6">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold">Binance Pay ID</p>
                            <p className="text-xl font-mono font-bold text-slate-900 tracking-wider">{binanceId}</p>
                        </div>
                        <button 
                            type="button"
                            onClick={handleCopy}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-brand-600"
                            title="Copy ID"
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-800">
                            Payment Transaction ID / Hash
                        </label>
                        <input 
                            required 
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            type="text" 
                            className="w-full h-12 rounded-lg border-slate-300 focus:ring-brand-500 focus:border-brand-500 bg-white" 
                            placeholder="Paste your transaction ID here for verification" 
                        />
                        <p className="text-xs text-slate-500">We verify transactions instantly to prioritize your application.</p>
                    </div>
                </div>

                <div className="mt-4 opacity-60 pointer-events-none grayscale">
                     <div className="border border-slate-200 p-4 rounded-xl flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <CreditCard className="w-6 h-6 text-slate-400" />
                             <span className="font-medium text-slate-600">Credit Card (Maintenance)</span>
                         </div>
                         <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                     </div>
                </div>

              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !transactionId}
                className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                    <>Processing...</>
                ) : (
                    <>Submit Application & Payment</>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secure Payment</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Data Encrypted</span>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN - Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                    <div>
                        <p className="text-sm text-slate-500">Visa Type</p>
                        <p className="font-medium text-slate-900">{visa.type}</p>
                    </div>
                     <div>
                        <p className="text-sm text-slate-500">Destination</p>
                        <p className="font-medium text-slate-900">{searchParams.destination}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Applicant</p>
                        <p className="font-medium text-slate-900">Citizen of {searchParams.citizenship}</p>
                    </div>
                     <div>
                        <p className="text-sm text-slate-500">Processing Time</p>
                        <p className="font-medium text-slate-900">{visa.processingTime}</p>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Government Fee (Estimated)</span>
                        <span>${estimatedFeeNum.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Service Fee</span>
                        <span>${SERVICE_FEE.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-sm text-green-600">
                        <span>Pre-check Discount</span>
                        <span>$0.00</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-lg text-slate-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                
                <div className="mt-6 bg-blue-50 p-3 rounded-lg flex items-start gap-3">
                     <div className="mt-0.5"><ShieldCheck className="w-5 h-5 text-brand-600" /></div>
                     <p className="text-xs text-brand-800 leading-relaxed">
                        <strong>100% Satisfaction Guarantee:</strong> If your visa is denied due to our error, we will refund our service fees in full.
                     </p>
                </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
