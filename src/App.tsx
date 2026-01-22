import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  CheckCircle2, 
  Phone,
  ArrowRight,
  Instagram,
  Facebook,
  Mail,
  Menu,
  X,
  Star,
  Users,
  ChevronDown,
  MessageSquare,
  HardHat,
  Zap,
  Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const HeaderFont = "font-['Bebas_Neue'] tracking-wider";

// --- Data ---

const ALL_SERVICES = [
  { 
    id: "outdoor-lighting",
    title: "Outdoor Lighting", 
    image: "/assets/outdoor lighting/Featured-Image-Chesterton-IN-Outdoor-Lighting-Company.jpg",
    desc: "Professional architectural and path lighting to transform your DFW property at night.",
    longDesc: "Bring your landscape to life after dark with our professional low-voltage LED lighting systems. As DFW's premier outdoor lighting specialists, we design professional illumination plans that highlight your home's architecture, improve safety, and create an enchanting nighttime atmosphere. From moonlighting in mature trees to elegant path lighting and smart controls, we provide the ultimate night ambiance for your DFW estate.",
    features: ["Architectural Lighting", "Path & Step Lights", "Smart App Controls", "Moonlighting", "Security Illumination"],
    process: [
      { title: "Design Consultation", desc: "We walk your property at night to identify key focal points and lighting needs." },
      { title: "Technical Setup", desc: "Professional installation of high-grade transformers and weather-proof LED fixtures." },
      { title: "Fine-Tuning", desc: "Night-time adjustment of every bulb to ensure the perfect shadows and glow." }
    ]
  },
  { 
    id: "permanent-trim-lights",
    title: "Permanent Trim Lights", 
    image: "/assets/outdoor lighting/NSLA2B252816002B25C325972B9002Bpx2529.jpg.webp",
    desc: "Invisible by day, brilliant by night. Permanent LED track lighting for year-round celebrations.",
    longDesc: "Say goodbye to ladders forever. Our permanent trim lighting systems are installed in a color-matched track that tucks invisibly under your eaves. Control millions of colors and hundreds of animations directly from your phone. Perfect for architectural accent lighting, holiday celebrations, and game day spirit, these professional-grade LEDs are built to last for decades in the North Texas climate.",
    features: ["Invisible Track Design", "Million Color Options", "App Controlled", "Cloud Access", "Energy Efficient LED"],
    process: [
      { title: "Site Measurement", desc: "We measure your roofline and match the track color to your home's trim." },
      { title: "Precision Install", desc: "Clean, professional installation of the track and hidden wiring." },
      { title: "App Configuration", desc: "Setting up your smartphone controls and teaching you how to create custom patterns." }
    ]
  },
  { 
    id: "landscape-design",
    title: "Landscape Design", 
    image: "/assets/river rock/landscape-design-front-yard-landscaping-houston-tx-77407.jpg",
    desc: "Expert architectural planning and sustainable garden design tailored for Frisco homes.",
    longDesc: "Our expert designers create breathtaking master plans that harmonize with your home's architecture and our professional lighting designs. We specialize in native plants, aesthetic layouts, and functional outdoor living zones. Whether you're looking for a modern minimalist retreat or a lush tropical oasis, our team brings your vision to life with precision and creativity.",
    features: ["3D Rendering", "Native Plant Palette", "Master Planning", "Irrigation Integration", "Lighting Harmony"],
    process: [
      { title: "Consultation", desc: "We meet on-site in Frisco to discuss your vision, budget, and property potential." },
      { title: "Design Phase", desc: "Detailed 2D/3D renderings showing exactly how your new yard will look." },
      { title: "Refinement", desc: "We adjust the design based on your feedback until it's perfect." }
    ]
  },
  { 
    id: "hardscaping",
    title: "Hardscaping & Patios", 
    image: "/assets/hardscaping/Hardscapes-1024x675.jpg",
    desc: "Premium stone work, patios, and walkways designed to be the foundation of your outdoor space.",
    longDesc: "Transform your yard with durable, high-end stone work. From professional pavers and flagstone patios to retaining walls and outdoor kitchens, we create structural beauty that stands the test of time. Our hardscaping is designed to integrate perfectly with our landscape lighting systems for a complete outdoor experience.",
    features: ["Paver Patios", "Retaining Walls", "Flagstone Work", "Outdoor Kitchens", "Fire Pits"],
    process: [
      { title: "Excavation", desc: "Professional site prep and base layering for structural integrity." },
      { title: "Installation", desc: "Expert stone setting with precision patterns and secure bonding." },
      { title: "Finishing", desc: "Sanding, sealing, and cleanup for a pristine, long-lasting look." }
    ]
  },
  { 
    id: "drainage-solutions",
    title: "Drainage Solutions", 
    image: "/assets/drainage/1.jpg",
    desc: "Advanced water management to protect your Frisco foundation and landscape.",
    longDesc: "Protect your Frisco property from water damage. Our experts design and install comprehensive drainage systems including French drains, catch basins, and gutter underground routing. Our solutions are engineered to handle Texas storms, preventing erosion and foundation issues while keeping your lawn pristine.",
    features: ["French Drains", "Gutter Routing", "Grading Correction", "Catch Basins", "Sump Pumps"],
    process: [
      { title: "Analysis", desc: "We identify water flow patterns and problem areas during heavy rain." },
      { title: "Engineering", desc: "Designing a system with proper pitch and capacity for your home." },
      { title: "Installation", desc: "Deep-trenching and professional-grade pipe installation." }
    ]
  },
  { 
    id: "sod-installation",
    title: "Sod Installation", 
    image: "/assets/sod installtion/about01-1024x576.jpg",
    desc: "Instant lawn transformation with premium Texas-grown Bermuda, St. Augustine, or Zoysia sod.",
    longDesc: "Get the lush green lawn you've always wanted instantly. Our team handles everything from site prep and grading to the expert installation of fresh, local sod. We ensure your new lawn is perfectly leveled and ready to thrive in the North Texas climate, especially when paired with our professional lighting.",
    features: ["Bermuda & Zoysia", "St. Augustine", "Full Lawn Removal", "Professional Grading", "Soil Amendment"],
    process: [
      { title: "Removal", desc: "Removing old weeds and dead grass to create a clean base." },
      { title: "Soil Prep", desc: "Tilling and adding fresh topsoil for maximum root health." },
      { title: "Installation", desc: "Tight-seam sod laying and initial deep watering." }
    ]
  },
  { 
    id: "tree-care",
    title: "Tree Planting & Care", 
    image: "/assets/tree planting/20220828_Planting-finished.jpg",
    desc: "Expert tree selection and professional planting, optimized for nighttime moonlighting.",
    longDesc: "We provide professional tree planting services, hand-selecting the best species for your specific soil and sunlight in Frisco. We specifically select trees that look stunning when illuminated by our professional moonlighting techniques, providing your property with shade, privacy, and nighttime elegance.",
    features: ["Species Selection", "Professional Planting", "Deep Root Fertilization", "Staking", "Moonlight Optimization"],
    process: [
      { title: "Sourcing", desc: "We hand-select healthy specimens from premium local nurseries." },
      { title: "Preparation", desc: "Digging the perfect hole with proper soil amendments." },
      { title: "Care Plan", desc: "Providing you with a detailed watering and maintenance schedule." }
    ]
  }
];

const SERVICE_AREAS = [
  { name: "Frisco", slug: "frisco" },
  { name: "Euless", slug: "euless" },
  { name: "Bedford", slug: "bedford" },
  { name: "Colleyville", slug: "colleyville" },
  { name: "North Richland Hills", slug: "north-richland-hills" },
  { name: "Southlake", slug: "southlake" },
  { name: "Grapevine", slug: "grapevine" },
  { name: "Keller", slug: "keller" },
  { name: "Watauga", slug: "watauga" },
  { name: "Haltom City", slug: "haltom-city" },
  { name: "Richland Hills", slug: "richland-hills" },
  { name: "Fort Worth", slug: "fort-worth" },
  { name: "Arlington", slug: "arlington" },
  { name: "Grand Prairie", slug: "grand-prairie" },
  { name: "Irving", slug: "irving" },
  { name: "Coppell", slug: "coppell" },
  { name: "Flower Mound", slug: "flower-mound" },
  { name: "Lewisville", slug: "lewisville" },
  { name: "Carrollton", slug: "carrollton" },
  { name: "Plano", slug: "plano" },
  { name: "Frisco", slug: "frisco" },
  { name: "McKinney", slug: "mckinney" },
  { name: "Allen", slug: "allen" },
  { name: "Mansfield", slug: "mansfield" },
  { name: "Kennedale", slug: "kennedale" },
  { name: "Everman", slug: "everman" },
  { name: "Forest Hill", slug: "everman" },
  { name: "White Settlement", slug: "white-settlement" },
  { name: "Frisco", slug: "frisco" },
  { name: "Crowley", slug: "crowley" },
  { name: "Burleson", slug: "burleson" },
  { name: "Joshua", slug: "justin" },
  { name: "Cleburne", slug: "cleburne" },
  { name: "Granbury", slug: "granbury" },
  { name: "Weatherford", slug: "weatherford" },
  { name: "Aledo", slug: "aleado" },
  { name: "Willow Park", slug: "willow-park" },
  { name: "Hudson Oaks", slug: "hudson-oaks" },
  { name: "Springtown", slug: "weatherford" },
  { name: "Azle", slug: "azle" },
  { name: "Lake Worth", slug: "lake-worth" },
  { name: "Saginaw", slug: "saginaw" },
  { name: "Haslet", slug: "haslet" },
  { name: "Justin", slug: "justin" },
  { name: "Roanoke", slug: "roanoke" },
  { name: "Argyle", slug: "argyle" },
  { name: "Denton", slug: "denton" },
  { name: "Corinth", slug: "corinth" },
  { name: "Little Elm", slug: "little-elm" },
  { name: "The Colony", slug: "the-colony" }
];

const FAQS = [
  {
    q: "What is low-voltage LED lighting?",
    a: "Low-voltage (12V) LED lighting is the industry standard for safe, energy-efficient, and long-lasting outdoor illumination. It uses significantly less power than traditional halogen systems and allows for much finer control of light output."
  },
  {
    q: "Can I control my lights from my phone?",
    a: "Yes! We install smart transformers that connect to your home Wi-Fi, allowing you to turn lights on/off, set schedules, and even dim certain zones directly from an app on your smartphone."
  },
  {
    q: "Do you offer a warranty on lighting systems?",
    a: "Absolutely. We provide a lifetime warranty on all of our brass and copper fixtures and a 5-year warranty on our professional-grade LED bulbs and transformers."
  },
  {
    q: "How long does a typical installation take?",
    a: "Most residential lighting projects in DFW are completed in 1-2 days. This includes trenching, wiring, fixture placement, and the final night-time adjustment."
  },
  {
    q: "Is the system weather-proof?",
    a: "Yes, our systems are specifically designed for the North Texas climate. We use weather-sealed connectors and heavy-duty transformers to ensure your lights perform perfectly through heat, rain, and ice."
  },
  {
    q: "Do you offer free lighting consultations in DFW?",
    a: "Yes! We provide free on-site evening consultations and detailed estimates for all residents in DFW and surrounding cities."
  },
  {
    q: "What is moonlighting?",
    a: "Moonlighting is a technique where we place fixtures high in mature trees to cast a soft, natural glow downwards through the branches, mimicking the effect of a full moon."
  },
  {
    q: "Do you handle other landscaping services too?",
    a: "Yes, while our focus is elite lighting, we are full-service landscape designers, handling hardscaping, drainage, and sod installation for DFW homes."
  }
];

const TESTIMONIALS = [
  {
    name: "James W.",
    location: "Southlake",
    text: "The DFW Outdoor & Landscape Lighting team did a phenomenal job on our architectural lighting. Our estate is now our favorite part of the neighborhood at night!",
    stars: 5
  },
  {
    name: "Linda K.",
    location: "Plano",
    text: "Professional, on-time, and incredibly knowledgeable. They installed a beautiful new permanent trim lighting system that we use for every holiday.",
    stars: 5
  },
  {
    name: "Robert S.",
    location: "Colleyville",
    text: "Highly recommend for any landscape lighting needs. Their design walk-through really helped us visualize the project before they started.",
    stars: 5
  }
];

const RECENT_PROJECTS = [
  { title: "Estate Moonlighting", category: "Lighting", image: "/assets/outdoor lighting/2021_Swoish_Orange_JE_-34-scaled.jpg" },
  { title: "Smart LED Install", category: "Lighting", image: "/assets/outdoor lighting/Smart_Full_Color_Lighting-min_1600x.jpg.webp" },
  { title: "DFW Garden Design", category: "Design", image: "/assets/river rock/landscape-design-front-yard-landscaping-houston-tx-77407.jpg" },
  { title: "Architectural Accents", category: "Lighting", image: "/assets/outdoor lighting/10710_Meadow_Stable_-_FB-2-min-mobile.jpg.webp" },
  { title: "Stone Patio Build", category: "Hardscaping", image: "/assets/hardscaping/hardscaping-services-in-colleyville-tx-scaled.jpg" },
  { title: "Pathway Illumination", category: "Lighting", image: "/assets/outdoor lighting/Featured-Image-Chesterton-IN-Outdoor-Lighting-Company.jpg" }
];

// --- Scroll to Top Component ---
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// --- Service Areas Page ---

const ServiceAreasPage = () => {
  return (
    <div 
       
       
      className="pt-32 pb-24 "
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-700 font-bold uppercase tracking-widest text-sm mb-4 block">Our Reach</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">Service Areas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            We provide top-rated landscaping services to Frisco and over 50 surrounding cities across the Dallas-Fort Worth metroplex.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICE_AREAS.map((area) => (
            <div
              key={area.slug}
            >
              <Link 
                to={`/location/${area.slug}`}
                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-600 hover:-translate-y-1 transition-all flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors">
                  <MapPin className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{area.name}</h3>
                <span className="text-xs font-bold text-gray-400 uppercase mt-2 group-hover:text-amber-600 transition-colors">View Services</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Local SEO Content Block */}
        <div className="mt-24 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
          <h2 className="text-3xl font-black mb-6">Searching for a Top-Rated Landscaper in Frisco?</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            If you're looking for professional Frisco landscaping companies, you've come to the right place. We are a locally owned and operated landscaping company in Frisco, TX, serving residential and commercial clients with high-end design and installation.
          </p>
          <p className="text-gray-600 leading-relaxed font-medium">
            Our team understands the specific soil conditions and climate of the North Texas area, ensuring that your investment grows and thrives for years to come. Whether you need hardscaping in Euless or sod installation in Bedford, we are the experts you can trust.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <Link to="/" onClick={handleHomeClick} className="flex items-center gap-3 group">
            <div className="bg-amber-600 p-2.5 rounded-full group-hover:rotate-12 transition-all shadow-lg border-2 border-white">
              <Zap className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col leading-none">
                  <span className={cn("text-3xl tracking-tight text-gray-900 uppercase", HeaderFont)}>DFW</span>
                  <span className="text-[10px] font-black tracking-[0.3em] text-amber-600 uppercase ml-0.5">Outdoor & Landscape Lighting</span>
                </div>
              </Link>
          
          <div className="hidden lg:flex items-center space-x-10 text-[13px] font-black uppercase tracking-widest">
            <Link to="/" onClick={handleHomeClick} className="text-gray-500 hover:text-amber-600 transition-colors">Home</Link>
            <a href="/#services" className="text-gray-500 hover:text-amber-600 transition-colors">Services</a>
            <Link to="/service-areas" onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-amber-600 transition-colors">Areas</Link>
            <a href="/#gallery" className="text-gray-500 hover:text-amber-600 transition-colors">Work</a>
            <a href="/#about" className="text-gray-500 hover:text-amber-600 transition-colors">About</a>
            <div className="flex items-center gap-6 pl-6 border-l border-gray-100">
              <a href="tel:682-244-4610" className="text-gray-900 font-black flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" /> 682-244-4610
              </a>
              <a href="/#contact" className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-gray-900 transition-all shadow-xl shadow-amber-100">
                Get Quote
              </a>
            </div>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-2">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl">
          <div className="p-6 space-y-6 font-black uppercase tracking-widest text-sm">
            <Link to="/" onClick={handleHomeClick} className="block text-gray-900">Home</Link>
            <a href="/#services" onClick={() => setIsOpen(false)} className="block text-gray-900">Services</a>
            <Link to="/service-areas" onClick={() => setIsOpen(false)} className="block text-gray-900">Service Areas</Link>
            <a href="/#gallery" onClick={() => setIsOpen(false)} className="block text-gray-900">Portfolio</a>
            <a href="/#about" onClick={() => setIsOpen(false)} className="block text-gray-900">About Us</a>
            <a href="tel:682-244-4610" className="block text-amber-600 text-lg">682-244-4610</a>
            <a href="/#contact" onClick={() => setIsOpen(false)} className="block w-full py-4 bg-amber-600 text-white rounded-xl text-center">
              Get A Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-40 pb-24 px-4 overflow-hidden ">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-black tracking-[0.2em] text-amber-700 uppercase bg-amber-100 rounded-md">
            <Star className="w-3 h-3 fill-amber-700" /> DFW's Professional Lighting Experts
          </div>
          <h1 className={cn("text-7xl md:text-9xl mb-8 leading-[0.8] text-gray-900 uppercase", HeaderFont)}>
            Own The <br />
            <span className="text-amber-600">Night</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mb-12 font-medium leading-relaxed">
            Professional landscape lighting and architectural illumination for Dallas-Fort Worth estates. We transform your property into a nighttime masterpiece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="px-12 py-6 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 shadow-2xl">
              Get Quote <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#gallery" className="px-12 py-6 bg-white border-2 border-gray-200 text-gray-900 rounded-xl font-black uppercase tracking-widest hover: transition-all shadow-sm">
              Our Projects
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-10 items-center opacity-50 font-black uppercase tracking-tighter text-sm">
            <div className="flex items-center gap-2"><Users className="w-5 h-5 text-amber-600"/> 500+ Built</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-amber-600"/> Licensed</div>
            <div className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-600"/> 5.0 Rating</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-amber-600 translate-x-4 translate-y-4 rounded-[2.5rem]"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[650px] bg-slate-100">
            <img 
              src="/assets/outdoor lighting/Featured-Image-Chesterton-IN-Outdoor-Lighting-Company.jpg" 
              alt="DFW Outdoor Lighting Design" 
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AboutUs = () => (
  <section id="about" className="py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="grid grid-cols-2 gap-4">
            <img src="/assets/outdoor lighting/95-Old-Ruby-Lane-Puslinch-5-Original-copy-2-1200x801.jpg.webp" className="rounded-3xl shadow-xl h-80 w-full object-cover mt-12" alt="Landscape 1" />
            <img src="/assets/outdoor lighting/Smart_Full_Color_Lighting-min_1600x.jpg.webp" className="rounded-3xl shadow-xl h-80 w-full object-cover" alt="Landscape 2" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Our Legacy</span>
          <h2 className={cn("text-6xl md:text-7xl text-gray-900 mb-8 leading-none uppercase tracking-tighter", HeaderFont)}>Expert <br/><span className="text-amber-600">Night Illumination</span></h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
            DFW Outdoor & Landscape Lighting specializes in professional-grade illumination. We don't just add lights; we design atmospheres. Our team understands how to highlight the unique architectural features of Dallas-Fort Worth estates.
          </p>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
            Every system we install is built for durability and elegance. From smart-controlled LED systems to precision-placed moonlighting, we are DFW's choice for elite outdoor lighting.
          </p>
          <div className="flex gap-12">
            <div>
              <div className="text-5xl font-black text-gray-900 mb-2 italic">10+</div>
              <div className="text-xs font-black text-amber-600 uppercase tracking-widest">Years Expertise</div>
            </div>
            <div>
              <div className="text-5xl font-black text-gray-900 mb-2 italic">100%</div>
              <div className="text-xs font-black text-amber-600 uppercase tracking-widest">Weather Proof</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const RecentWork = () => (
  <section id="gallery" className="py-32 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Our Portfolio</span>
          <h2 className={cn("text-6xl md:text-8xl uppercase tracking-tighter", HeaderFont)}>Recent Projects</h2>
        </div>
        <button className="px-10 py-5 border-2 border-white/20 rounded-xl font-black uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all">
          View Full Gallery
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {RECENT_PROJECTS.map((project, i) => (
          <div
            key={i}
            
            
            
            
            className="group relative h-[500px] overflow-hidden rounded-2xl transition-all duration-500"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent p-10 flex flex-col justify-end">
              <span className="text-amber-500 font-black text-xs uppercase tracking-widest mb-3">{project.category}</span>
              <h4 className="text-3xl font-black uppercase tracking-tighter leading-none">{project.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-20 uppercase tracking-tighter">Client Reviews</h2>
      <div className="grid md:grid-cols-3 gap-12 text-left">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="border-l-4 border-amber-600 pl-10 py-4"
            
            
            
            
          >
            <div className="flex gap-1 mb-6">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-600 text-amber-600" />
              ))}
            </div>
            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
            <div>
              <h4 className="font-black text-gray-900 text-lg uppercase tracking-widest">{t.name}</h4>
              <span className="text-amber-600 font-black text-xs uppercase">{t.location}, TX</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-5">
          <div className="lg:col-span-2 bg-gray-900 p-12 lg:p-20 text-white">
            <h2 className="text-5xl font-black mb-10 leading-none uppercase tracking-tighter">Start Your <br/><span className="text-amber-600">Project</span></h2>
            <p className="text-gray-400 text-lg font-medium mb-12 leading-relaxed">
              Contact our design team to schedule your on-site consultation.
            </p>
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Phone className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Call Us</div>
                  <a href="tel:682-244-4610" className="text-2xl font-black hover:text-amber-500 transition-colors tracking-tighter">682-244-4610</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <MapPin className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Headquarters</div>
                  <div className="text-2xl font-black tracking-tighter">Dallas-Fort Worth, Texas</div>
                </div>
              </div>
            </div>
            <div className="mt-20 flex gap-6">
              <Instagram className="w-6 h-6 text-gray-500 hover:text-slate-600 transition-colors cursor-pointer" />
              <Facebook className="w-6 h-6 text-gray-500 hover:text-slate-600 transition-colors cursor-pointer" />
            </div>
          </div>
          <div className="lg:col-span-3 p-0 h-[800px] lg:h-auto border-l border-gray-100">
            {/* GHL Form Integration */}
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/h3lFbvYfvber5oGCBAd7"
              style={{ width: '100%', height: '100%', border: 'none' }}
              id="inline-h3lFbvYfvber5oGCBAd7" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivated"
              data-deactivation-value=""
              data-form-name="DFW Outdoor & Landscape Lighting Lead Form"
              data-height="800"
              data-layout-iframe-id="inline-h3lFbvYfvber5oGCBAd7"
              data-form-id="h3lFbvYfvber5oGCBAd7"
              title="DFW Outdoor & Landscape Lighting Lead Form"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { icon: MessageSquare, title: "Night Walk", desc: "On-site evening consultation to design your professional lighting layout." },
    { icon: Zap, title: "Technical Plan", desc: "Detailed mapping of transformers, zones, and load requirements." },
    { icon: HardHat, title: "Installation", desc: "Professional burial of low-voltage lines and fixture placement." },
    { icon: Sparkles, title: "Night Tuning", desc: "Final evening adjustments to ensure the perfect beam spread and glow." }
  ];

  return (
    <section className="py-32  overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-20 uppercase tracking-tighter italic">Our Lighting Workflow</h2>
        <div className="grid md:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <div 
              key={i}
              
              
              
              
              className="relative group"
            >
              <div className="w-24 h-24 bg-gray-900 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                <step.icon size={40} />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-widest italic">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-bold">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">Frisco FAQ</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className=" rounded-2xl overflow-hidden border border-gray-100">
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full px-8 py-8 flex items-center justify-between text-left hover: transition-colors"
              >
                <span className="font-black text-lg text-gray-900 uppercase tracking-widest">{faq.q}</span>
                <ChevronDown className={cn("w-6 h-6 text-amber-600 transition-transform", activeIndex === i && "rotate-180")} />
              </button>
              <>
                {activeIndex === i && (
                  <div
                    
                    
                    
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-gray-600 font-bold leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                )}
              </>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-xl mb-24">
          <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Capabilities</span>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">Our <br/>Services</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ALL_SERVICES.map((s, i) => (
            <div 
              key={i} 
              
              
              
              
              className="bg-white rounded-3xl overflow-hidden shadow-2xl group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="h-72 overflow-hidden relative">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-bold">{s.desc}</p>
                <Link 
                  to={`/location/frisco/${s.id}`}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white font-black uppercase text-[10px] tracking-widest rounded-lg hover:bg-amber-600 transition-colors"
                >
                  View Detail <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceAreas = () => {
  return (
    <section id="areas" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Locations</span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Frisco & Beyond</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SERVICE_AREAS.slice(0, 20).map((area) => (
            <div
              key={area.slug}
            >
              <Link 
                to={`/location/${area.slug}`}
                className="p-6  rounded-xl font-black text-gray-900 uppercase tracking-tighter text-sm hover:bg-amber-600 hover:text-white transition-all text-center block shadow-sm border border-gray-100"
              >
                {area.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/service-areas" className="font-black uppercase tracking-widest text-xs text-amber-600 border-b-2 border-amber-600 pb-1 hover:text-gray-900 hover:border-gray-900 transition-colors">
            See All 50+ Cities
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- Dynamic Location Page ---

const LocationPage = () => {
  const { city } = useParams();
  const location = SERVICE_AREAS.find(a => a.slug === city);
  const cityName = location?.name || city?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div 
      className="pt-40"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mb-32">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-black tracking-[0.2em] text-amber-700 uppercase bg-amber-100 rounded-md">
              Serving {cityName}, TX
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] uppercase tracking-tighter">
              Expert Landscapes <br/><span className="text-amber-600">{cityName}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
              Professional exterior construction and site development services for residential properties in {cityName}.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {["Professional Work", "Professional Engineering", "Precision Builds", "Local Experts"].map(t => (
                <div key={t} className="flex items-center gap-4 font-black text-gray-900 uppercase text-xs tracking-widest italic border-l-2 border-amber-600 pl-4">
                  {t}
                </div>
              ))}
            </div>
            <a href="#contact" className="inline-block px-12 py-6 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-2xl">
              Request {cityName} Consultation
            </a>
          </div>
        </div>

        <div className="mb-32">
          <h2 className="text-5xl font-black mb-16 text-center uppercase tracking-tighter italic">Professional Solutions for {cityName}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ALL_SERVICES.map((s, i) => (
              <Link to={`/location/${city}/${s.id}`} key={i}>
                <div 
                  
                  
                  
                  
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all group h-full flex flex-col"
                >
                  <div className="h-72 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="p-10 flex-grow">
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-widest italic">{s.title}</h3>
                    <p className="text-gray-500 text-sm font-bold mb-8 leading-relaxed">{s.desc}</p>
                    <div className="text-amber-600 font-black text-xs uppercase tracking-widest flex items-center gap-3 group-hover:gap-5 transition-all">
                      View Service Specs <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

// --- SEO Content Generator Component ---

const ServiceSEOContent = ({ serviceId, cityName }: { serviceId: string, cityName: string }) => {
  const content: Record<string, React.ReactNode> = {
    "outdoor-lighting": (
      <div className="prose prose-lg max-w-none text-gray-600 font-bold leading-relaxed space-y-8 text-justify">
        <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic text-left">The Best Outdoor Lighting Company in {cityName}, TX Near Me</h2>
        <p>
          Transforming your property with professional **outdoor lighting in {cityName}, TX** is more than just a home improvement project; it's an investment in safety, security, and nighttime elegance. At Frisco Outdoor & Landscape Lighting, we understand that {cityName} homeowners value sophistication and quality. That's why we offer specialized architectural illumination and landscape lighting solutions tailored specifically for the North Texas climate and architectural styles found in our local communities.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Why Professional Landscape Lighting Matters in {cityName}</h3>
        <p>
          Searching for an **outdoor lighting company near me** often leads to generic results, but elite lighting design requires a deep understanding of light temperature, beam spread, and voltage drop. In {cityName}, where summer evenings are meant for outdoor living, our low-voltage LED systems provide the perfect ambiance without the harsh glare of traditional floodlights. We focus on "painting with light," highlighting the textures of your home's stone work and the natural beauty of your mature trees.
        </p>
        <p>
          Our systems are engineered for longevity. North Texas weather can be brutal, with extreme heat, heavy spring rains, and occasional ice. We use only architectural-grade brass and copper fixtures that develop a beautiful patina over time and are completely sealed against moisture. When you choose Frisco Outdoor & Landscape Lighting as your **landscaper in {cityName}**, you're choosing a system that will look as beautiful in ten years as it does on the night we first turn it on.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Technical Excellence & Smart Automation</h3>
        <p>
          Modern {cityName} estates require modern solutions. Our smart lighting transformers connect directly to your home's Wi-Fi, giving you complete control via your smartphone. You can set custom schedules, dim specific zones for a more intimate setting, or activate security lighting with a single tap. This level of control is what separates a professional installation from a DIY kit. We handle the complex electrical load calculations and precision wiring to ensure every bulb on your property has consistent brightness and color.
        </p>
        <p>
          Beyond beauty, our lighting designs prioritize security. Strategic illumination of dark corners and entry points deter intruders while making it safe for your family to navigate walkways and stairs at night. It's the ultimate combination of form and function. As the leading **landscaping company in {cityName}**, we take pride in delivering results that exceed expectations and enhance the curb appeal of every home we touch.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Our Process: The {cityName} Standard</h3>
        <p>
          Every project begins with a nighttime walk-through. We want to see how light and shadow interact on your specific property. We'll identify focal points like majestic oaks, custom water features, or intricate stonework that deserve to be showcased. Following our consultation, we provide a detailed plan that outlines fixture placement and lighting zones. Our installation crews are professional, clean, and respectful of your property, ensuring that all wiring is buried deep and all tracks are invisible by day.
        </p>
        <p>
          If you're ready to "Own the Night" and transform your {cityName} home into a nighttime masterpiece, contact Frisco Outdoor & Landscape Lighting today. We are the **outdoor lighting experts near me** that you can trust for precision, beauty, and unparalleled service in North Texas.
        </p>
      </div>
    ),
    "permanent-trim-lights": (
      <div className="prose prose-lg max-w-none text-gray-600 font-bold leading-relaxed space-y-8 text-justify">
        <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic text-left">Permanent Holiday & Trim Lighting in {cityName}, TX</h2>
        <p>
          Imagine never having to climb a ladder again to hang holiday lights. With **permanent trim lights in {cityName}, TX**, you can celebrate every occasion—from Christmas and Halloween to game days and birthdays—with a single tap on your phone. Frisco Outdoor & Landscape Lighting is proud to offer the most advanced permanent LED track lighting system in North Texas, designed to be invisible by day and brilliant by night.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Invisible Integration, Year-Round Beauty</h3>
        <p>
          One of the biggest concerns {cityName} homeowners have is how the lighting looks during the day. Our system is installed in a professional, architectural-grade track that is color-matched to your home's trim (soffit or fascia). This ensures the system is virtually invisible when turned off, maintaining your home's clean aesthetic. When the sun goes down, the magic begins. You can select from millions of colors and hundreds of animations to create the perfect look for any mood or event.
        </p>
        <p>
          As a top-rated **landscaping company in {cityName}**, we focus on high-end solutions that add value to your property. Our permanent trim lights aren't just for holidays; they serve as elegant architectural accent lighting year-round. You can set them to a soft warm white to highlight your home's peaks and valleys, providing an upscale look that rivals expensive permanent architectural lighting installations.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">The Smartest Way to Light Your {cityName} Home</h3>
        <p>
          Our cloud-based control system is the best in the industry. Whether you're at home in {cityName} or traveling abroad, you can manage your lights from anywhere. The app allows you to create custom patterns, set timers for the entire year, and even sync your lights to music. It's the ultimate "set it and forget it" solution for busy families who want their home to stand out in the neighborhood.
        </p>
        <p>
          Durability is key in North Texas. Our LEDs are rated for 50,000 hours of use and are built to withstand the freezing winters and scorching summers of the DFW area. We use weather-proof connectors and high-grade controllers to ensure your system performs flawlessly for decades. When searching for **permanent lighting near me**, look for the experts at Frisco Outdoor & Landscape Lighting.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Expert Installation & Support</h3>
        <p>
          Professional installation is what makes our system look its best. Our trained technicians understand rooflines, electrical safety, and hidden wiring techniques. We take the time to ensure every light is perfectly aligned and every wire is tucked away. We don't just install the lights and leave; we sit down with you to set up the app and teach you how to make the most of your new system.
        </p>
        <p>
          Join the hundreds of {cityName} residents who have upgraded to permanent trim lighting. It's the safest, smartest, and most beautiful way to light your home for every season. Contact us today for a free estimate and see why we are the preferred **permanent lighting company in {cityName}**.
        </p>
      </div>
    ),
    "landscape-design": (
      <div className="prose prose-lg max-w-none text-gray-600 font-bold leading-relaxed space-y-8 text-justify">
        <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic text-left">Professional Landscape Design in {cityName}, TX</h2>
        <p>
          Elite **landscape design in {cityName}, TX** requires a balance of art and science. At Frisco Outdoor & Landscape Lighting, we don't just plant trees and flowers; we engineer outdoor environments that thrive in the unique conditions of North Texas. As a premier **landscaping company in {cityName}**, our goal is to create a seamless transition between your home's interior and the natural beauty of your outdoor living space.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">The Design-First Approach for {cityName} Homes</h3>
        <p>
          Many people search for a **landscaper near me** only to find "mow and blow" crews. We are different. We believe that every great landscape starts with a professional plan. Our design process includes site analysis, drainage assessment, and a deep understanding of your lifestyle. Do you need a safe space for children to play, a high-end area for entertaining guests, or a quiet retreat for relaxation? Our 3D renderings allow you to walk through your new yard before a single shovel hits the ground.
        </p>
        <p>
          In {cityName}, we deal with expansive clay soils and extreme temperature fluctuations. Our plant selections are based on "Texas Tough" principles—choosing native and adapted species that offer year-round interest while requiring less water and maintenance. From architectural evergreens that provide privacy to seasonal color that pops against your home's stone, our designs are built to last.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Integrating Lighting & Hardscape</h3>
        <p>
          What sets us apart as a **landscaping company in {cityName}** is our ability to integrate multiple elements into a cohesive master plan. We design your landscape with lighting in mind from the very beginning, ensuring that every tree and path is positioned for maximum nighttime impact. We also coordinate with our hardscaping teams to ensure your patios and walkways flow naturally through your garden beds.
        </p>
        <p>
          Sustainable design is also a priority for our {cityName} clients. We incorporate advanced irrigation systems and smart controllers that adjust based on local weather data, ensuring your landscape stays healthy without wasting water. We also focus on soil health, using organic amendments and proper mulching techniques to create a thriving ecosystem in your own backyard.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Your {cityName} Landscape Transformation</h3>
        <p>
          Whether you're starting with a blank slate at a new construction home or looking to renovate an established estate, our team has the expertise to deliver a world-class result. We take pride in our craftsmanship and our commitment to customer satisfaction. When you choose Frisco Outdoor & Landscape Lighting, you're choosing the best **landscaper in {cityName}** for high-end, architectural results.
        </p>
      </div>
    ),
    "hardscaping": (
      <div className="prose prose-lg max-w-none text-gray-600 font-bold leading-relaxed space-y-8 text-justify">
        <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic text-left">Elite Hardscaping & Stone Patios in {cityName}, TX</h2>
        <p>
          Hardscaping is the backbone of any great outdoor living space. For **hardscaping in {cityName}, TX**, homeowners trust Frisco Outdoor & Landscape Lighting to build structures that are as durable as they are beautiful. From professional paver patios and natural stone walkways to structural retaining walls and outdoor kitchens, we specialize in high-end masonry that transforms your yard into a functional extension of your home.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Built for the North Texas Clay</h3>
        <p>
          One of the biggest challenges for a **landscaper in {cityName}** is the shifting black clay soil common in our area. Without proper engineering, stone work will quickly crack and shift. We use advanced base preparation techniques, including deep excavation and compacted crushed stone, to ensure your patio stays level for decades. We don't take shortcuts because we know that a "cheap" installation is the most expensive one you'll ever buy when it has to be replaced in three years.
        </p>
        <p>
          Whether you prefer the clean lines of modern concrete pavers or the natural elegance of Oklahoma flagstone, our craftsmen are experts in precision stone setting. We pay attention to the details—the tight seams, the perfect pitch for drainage, and the professional sealing that protects your stone from the Texas sun. This commitment to quality is why we are considered the premier **hardscaping company near me** in the Frisco area.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Outdoor Living & Entertaining</h3>
        <p>
          Your backyard should be more than just grass; it should be a destination. We design and build custom outdoor kitchens, fire pits, and fireplaces that allow you to enjoy your {cityName} property year-round. Our hardscape designs are always integrated with our professional lighting, creating an enchanting environment for evening entertaining.
        </p>
        <p>
          Retaining walls are another specialty. In {cityName}, many properties have significant elevation changes that require structural support. We build walls that are not only functional but also serve as beautiful landscape features, using premium materials like Milsap stone or modern architectural blocks. If you're looking for a **landscaping company in {cityName}** that handles serious site work, look no further.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">The Professional Choice</h3>
        <p>
          When you're ready to upgrade your outdoor living space, choose the team that understands the local landscape and the highest standards of construction. Frisco Outdoor & Landscape Lighting is the **hardscaping expert in {cityName}** you can count on for a "built to spec" result every time.
        </p>
      </div>
    ),
    "drainage-solutions": (
      <div className="prose prose-lg max-w-none text-gray-600 font-bold leading-relaxed space-y-8 text-justify">
        <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic text-left">Advanced Drainage Solutions in {cityName}, TX</h2>
        <p>
          Poor drainage is the #1 enemy of properties in North Texas. If you're searching for **drainage solutions in {cityName}, TX**, you need more than just a guy with a shovel—you need an engineered system. Frisco Outdoor & Landscape Lighting specializes in complex water management, protecting your home's foundation and your landscape from the devastating effects of pooling water and erosion.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Why {cityName} Homes Need Expert Drainage</h3>
        <p>
          The heavy clay soil in {cityName} does not absorb water quickly. During our intense spring storms, thousands of gallons of water can dump onto your roof and into your yard in minutes. If that water isn't directed away from your foundation, it can lead to expensive structural repairs, mold, and a swampy, unusable lawn. As a specialized **landscaping company in {cityName}**, we offer a range of solutions including French drains, catch basins, and gutter underground routing.
        </p>
        <p>
          Many **landscapers in {cityName}** install "black corrugated pipe" which quickly clogs with roots and debris. We use only professional-grade, smooth-wall PVC pipe with clean-out ports, ensuring your system remains functional for the life of your home. We use laser-leveling to ensure proper pitch, so water always flows where it's supposed to—away from your property.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Foundation Protection & Grading</h3>
        <p>
          Corrective grading is often the first line of defense. We use professional equipment to re-slope areas of your yard that are holding water, ensuring a positive flow toward the street or a drainage point. This is critical for {cityName} estates where new construction or neighboring builds may have altered the natural flow of water.
        </p>
        <p>
          Don't wait until your foundation starts to crack or your landscape is ruined. If you see standing water after a rain, it's time to call the **drainage experts in {cityName} near me**. We provide a thorough site analysis and a technical plan to solve your water problems once and for all.
        </p>
      </div>
    ),
    "sod-installation": (
      <div className="prose prose-lg max-w-none text-gray-600 font-bold leading-relaxed space-y-8 text-justify">
        <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic text-left">Professional Sod Installation in {cityName}, TX</h2>
        <p>
          Nothing transforms a home faster than a lush, green lawn. For **sod installation in {cityName}, TX**, Frisco Outdoor & Landscape Lighting provides a "golf course quality" result that you won't get from a generic yard crew. As a premier **landscaping company in {cityName}**, we understand that a successful lawn starts with what's *underneath* the grass.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">The Secret to a Healthy {cityName} Lawn</h3>
        <p>
          Most people search for **sod near me** and think they can just throw it on top of the old grass. In {cityName}, the heavy clay soil must be properly prepared. Our process includes full removal of old vegetation, professional tilling, and the addition of nutrient-rich topsoil and compost. This ensures that your new sod can establish deep roots, making it more drought-resistant and healthy during the hot North Texas summers.
        </p>
        <p>
          We source our sod from the best local farms in Texas, ensuring it's fresh-cut and delivered the same day we install it. Whether you need Bermuda for a full-sun backyard, St. Augustine for a shaded front yard, or high-end Zoysia for a luxury look, we'll recommend the best variety for your specific {cityName} property.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Precision Grading & Finishing</h3>
        <p>
          A great lawn must be level. We use professional equipment to grade your yard, removing bumps and dips that can cause trip hazards or poor drainage. Our crews lay the sod with tight, staggered seams, ensuring an "instant carpet" look from day one. We also provide you with a detailed watering and maintenance schedule to ensure your new investment thrives.
        </p>
        <p>
          If you're tired of a patchy, weed-filled yard, contact the best **landscaper in {cityName}** for a complete lawn renovation. We'll give you the beautiful green space your home deserves.
        </p>
      </div>
    ),
    "tree-care": (
      <div className="prose prose-lg max-w-none text-gray-600 font-bold leading-relaxed space-y-8 text-justify">
        <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic text-left">Professional Tree Planting & Care in {cityName}, TX</h2>
        <p>
          Trees are the most valuable assets in your landscape. For **tree planting in {cityName}, TX**, Frisco Outdoor & Landscape Lighting offers expert selection and professional techniques that ensure your trees grow strong and healthy for generations. As a trusted **landscaping company in {cityName}**, we specialize in "specimen-grade" trees that provide immediate shade, privacy, and beauty to your estate.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Choosing the Right Tree for {cityName}</h3>
        <p>
          Not all trees are created equal. Searching for **tree planting near me** can lead to buying trees that aren't suited for our local environment. We select only those species that are "Texas Proven," such as Live Oaks, Red Oaks, Cedar Elms, and ornamental favorites like Japanese Maples and Vitex. We consider soil type, sunlight exposure, and ultimate growth size to ensure your tree is planted in the perfect location.
        </p>
        <p>
          Proper planting technique is critical. Most trees that fail in {cityName} were planted too deep or in a hole that was too small. We excavate wide, "saucer-shaped" holes that allow roots to spread easily through the clay soil. We also add professional-grade organic amendments and root stimulants to give your new tree the best possible start.
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest italic text-left">Integration with Lighting & Irrigation</h3>
        <p>
          As experts in **outdoor lighting in {cityName}**, we always consider how a new tree will look at night. We'll recommend species that offer beautiful branch structure and canopy density for moonlighting or up-lighting effects. We also ensure your trees are integrated into your irrigation system, providing deep-root watering that is essential during {cityName}'s frequent droughts.
        </p>
        <p>
          If you want to add shade, privacy, or value to your property, choose the **landscaper in {cityName}** with a reputation for excellence. Contact us today for a consultation on your tree planting and landscape needs.
        </p>
      </div>
    )
  };

  return content[serviceId] || <div className="p-12 text-center bg-gray-50 rounded-3xl font-bold text-gray-400 uppercase tracking-widest">Build specs coming soon for {cityName}...</div>;
};

// --- Dynamic Service Location Page ---

const ServiceLocationPage = () => {
  const { city, serviceId } = useParams();
  const service = ALL_SERVICES.find(s => s.id === serviceId);
  const location = SERVICE_AREAS.find(a => a.slug === city);
  const cityName = location?.name || city?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Frisco';

  if (!service || !serviceId) return <div>Service not found</div>;

  return (
    <div 
       
       
      className="pt-40 pb-32"
    >
      <div className="max-w-7xl mx-auto px-4">
        <Link to={`/location/${city}`} className="inline-flex items-center gap-3 text-amber-600 font-black uppercase text-xs tracking-widest mb-12 hover:gap-5 transition-all">
          <ArrowRight className="w-5 h-5 rotate-180" /> Back to {cityName}
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-24 items-start mb-32">
          <div className="lg:col-span-2">
            <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] uppercase tracking-tighter">
              {service.title} <br/>
              <span className="text-amber-600">in {cityName}, TX</span>
            </h1>
            
            <div className="mt-16">
              <ServiceSEOContent serviceId={serviceId} cityName={cityName} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 my-16">
              {service.features.map(f => (
                <div key={f} className="flex items-center gap-4 text-xs font-black text-gray-900 uppercase tracking-widest  p-6 rounded-2xl border border-gray-100 italic">
                  <CheckCircle2 className="text-amber-600 w-5 h-5" /> {f}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-10 lg:sticky lg:top-40">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl   transition-all duration-700">
              <img src={service.image} className="w-full h-full object-cover" alt={`${service.title} in ${cityName}`} />
            </div>

            <div className="bg-gray-900 p-12 rounded-[3rem] shadow-2xl text-white">
              <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Site Consultation</h3>
              <p className="text-gray-400 font-bold mb-10 leading-relaxed">Schedule your {cityName} build specs today.</p>
              <a href="#contact" className="w-full py-6 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-4 shadow-xl">
                Get My Estimate <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-gray-900 selection:bg-amber-100 selection:text-amber-900 font-sans tracking-tight">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Hero />
              <Process />
              <AboutUs />
              <Services />
              <FAQSection />
              <RecentWork />
              
              <section className="py-32 bg-gray-900 text-white border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
                  <div>
                    <div className="text-6xl font-black text-amber-600 mb-4 italic leading-none">500+</div>
                    <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Local Builds</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-amber-600 mb-4 italic leading-none">10+</div>
                    <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Service Years</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-amber-600 mb-4 italic leading-none">100%</div>
                    <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Quality Verified</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-amber-600 mb-4 italic leading-none">DFW</div>
                    <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Home Experts</div>
                  </div>
                </div>
              </section>

              <Testimonials />
              <ServiceAreas />
              
              <ContactSection />
            </motion.div>
          } />
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/location/:city" element={<LocationPage />} />
          <Route path="/location/:city/:serviceId" element={<ServiceLocationPage />} />
        </Routes>
        
        <footer className="bg-gray-900 text-white py-32 px-4 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-20">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-4 mb-10 group">
                <div className="bg-amber-600 p-2.5 rounded-full border-2 border-white/20">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-3xl font-black tracking-tighter text-white uppercase">DFW</span>
                  <span className="text-[11px] font-black tracking-[0.3em] text-amber-600 uppercase ml-0.5">Outdoor & Landscape Lighting</span>
                </div>
              </Link>
              <p className="text-gray-400 max-w-sm mb-12 font-bold text-lg leading-relaxed">
                Elite outdoor lighting and architectural illumination for Dallas-Fort Worth since 2014.
              </p>
              <div className="flex gap-8">
                {[Instagram, Facebook, Mail].map((Icon, i) => (
                  <div key={i} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-amber-600 transition-all cursor-pointer border border-white/10 group">
                    <Icon className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors"/>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.3em] text-amber-600 mb-10">Directory</h4>
              <ul className="space-y-6 text-gray-400 font-black uppercase tracking-widest text-[11px]">
                <li><Link to="/" className="hover:text-white transition-colors">Home Base</Link></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Capabilities</a></li>
                <li><Link to="/service-areas" className="hover:text-white transition-colors">Service Areas</Link></li>
                <li><a href="/#gallery" className="hover:text-white transition-colors">The Work</a></li>
                <li><a href="/#contact" className="hover:text-white transition-colors">Get Estimate</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.3em] text-amber-600 mb-10">Dispatch</h4>
              <ul className="space-y-8 text-gray-400 font-black uppercase text-xs tracking-widest">
                <li className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <Phone size={20} className="text-amber-600" />
                  </div>
                  <a href="tel:682-244-4610" className="hover:text-white transition-colors italic">682-244-4610</a>
                </li>
                <li className="flex items-center gap-5 text-[11px]">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <MapPin size={20} className="text-amber-600" />
                  </div>
                  Dallas-Fort Worth, Texas
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
            <p>&copy; {new Date().getFullYear()} DFW Outdoor & Landscape Lighting. Built To Spec.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
