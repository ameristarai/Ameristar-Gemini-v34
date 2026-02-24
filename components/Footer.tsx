import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-oxford border-t border-gray-800 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
        
        <div className="text-center md:text-left space-y-4">
          <h4 className="font-display text-3xl tracking-luxury uppercase text-white">
            AMERISTAR <span className="font-light italic capitalize text-brand-gold">School</span>
          </h4>
          <p className="text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} Ameristar School. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-12">
          <button 
            onClick={() => onNavigate(Page.Privacy)}
            className="text-gray-400 hover:text-champagne text-sm tracking-widest uppercase transition-colors duration-300"
          >
            Privacy
          </button>
          <button 
            onClick={() => onNavigate(Page.Terms)}
            className="text-gray-400 hover:text-champagne text-sm tracking-widest uppercase transition-colors duration-300"
          >
            Terms
          </button>
          <button 
            onClick={() => onNavigate(Page.Sitemap)}
            className="text-gray-400 hover:text-champagne text-sm tracking-widest uppercase transition-colors duration-300"
          >
            Sitemap
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;