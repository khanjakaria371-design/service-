import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Business Visas</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Tourist Visas</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Passport Renewal</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>
          <div>
             <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Legal</h3>
             <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 GlobalVisa HQ. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             {/* Social placeholders */}
             <div className="w-5 h-5 bg-slate-700 rounded-full"></div>
             <div className="w-5 h-5 bg-slate-700 rounded-full"></div>
             <div className="w-5 h-5 bg-slate-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
