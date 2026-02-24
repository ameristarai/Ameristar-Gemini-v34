import { useState, useEffect } from 'react';
import { ArrowRight, Shield, Award, BookOpen } from 'lucide-react';
import { Page } from '../types';
import SEO from '../components/SEO';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const heroImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070", // Modern Architecture / Stability
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2071", // Professional / Suit Detail
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070", // Education / Strategy
];

const Home = ({ onNavigate }: HomeProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <SEO 
        title="Premier CA Licensing Education"
        description="Ameristar School: The top-rated CA Real Estate (DRE) and Insurance (DOI) licensing school. Pre-licensing exams and continuing education in California."
        keywords="CA real estate, CA insurance, CA DRE, CA DOI, CA licensing, real estate school, insurance school"
      />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 relative">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-8 animate-fade-in-up z-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-obsidian">
              Open Doors.<br />
              <span className="italic text-champagne">Secure Futures.</span>
            </h1>
            <p className="font-sans text-gray-500 text-lg md:text-xl max-w-md leading-relaxed">
              Pass your California Real Estate or Insurance exam with confidence. Expert-designed courses, built for first-time passers.
            </p>
            <div className="pt-8">
              <button
                onClick={() => onNavigate(Page.Courses)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-champagne text-white overflow-hidden transition-all hover:bg-[#b8962e] shadow-md hover:shadow-lg"
              >
                <span className="font-sans tracking-widest text-sm uppercase">Begin Your Journey</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative h-[50vh] md:h-[80vh] w-full overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] shadow-2xl">
            {/* Slideshow */}
            {heroImages.map((src, index) => (
              <img 
                key={src}
                src={src} 
                alt="Professional Excellence"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                  index === currentImageIndex ? 'opacity-90 grayscale hover:scale-105 transform duration-[10000ms]' : 'opacity-0'
                }`}
              />
            ))}
            {/* Overlay Gradient for text readability if needed, though side-by-side doesn't need it as much */}
            <div className="absolute inset-0 bg-oxford/10 mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Philosophy / Value Prop - High Contrast Blue Section */}
      <section className="py-32 bg-oxford text-white relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-champagne/20 transition-colors duration-500">
                <Shield className="w-8 h-8 text-champagne" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl tracking-wide">Licensure Excellence</h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Study materials rigorously designed to pass California Department of Insurance exams on the first attempt.
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-champagne/20 transition-colors duration-500">
                <BookOpen className="w-8 h-8 text-champagne" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl tracking-wide">Continuing Education</h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Curated content for renewal requirements. Keep your knowledge sharp and your license active with effortless compliance.
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-champagne/20 transition-colors duration-500">
                <Award className="w-8 h-8 text-champagne" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl tracking-wide">Expert Mentorship</h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Founded by Shirley Miao, bridging decades of industry wisdom with modern educational strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Split */}
      <section className="min-h-[80vh] flex items-center bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="relative group overflow-hidden">
              {/* Image: Mixed Asian-Caucasian woman, business setting, high rise view */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                alt="Professional Business Woman in High Rise" 
                className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-champagne/20 backdrop-blur-sm -z-10"></div>
              <div className="absolute -top-8 -left-8 w-48 h-48 border border-champagne/30 -z-10"></div>
            </div>
            <div className="space-y-10">
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Simplicity is the<br />ultimate sophistication.
              </h2>
              <p className="text-gray-500 text-lg font-light leading-loose">
                We believe learning shouldn't be cluttered. Our curriculum is stripped of the non-essential, leaving only the potent knowledge you need to succeed. The result is clarity, speed, and confidence.
              </p>
              <button 
                onClick={() => onNavigate(Page.About)}
                className="text-obsidian border-b border-black pb-1 hover:text-champagne hover:border-champagne transition-colors uppercase tracking-widest text-sm"
              >
                Read the Founder's Story
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;