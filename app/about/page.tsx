// app/about/page.tsx
import { Rocket, Zap, Leaf, Gauge, Package, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Puffy Roll
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We ship premium rolling gear worldwide - no judgment, just quality equipment 
          that arrives discreetly at your door.
        </p>
      </section>

      {/* Product Showcase */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-sm mb-16">
        <div className="grid md:grid-cols- gap-12 items-center">
 
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How We Operate
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're not manufacturers - we're curators. Our team tests hundreds of 
              grinders, rollers, and accessories so you only get gear that won't 
              let you down after three uses.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <FeatureIcon 
                icon={<Zap className="w-6 h-6" />} 
                title="No-Fuss Shipping" 
                text="Discreet packaging to any country that allows imports"
              />
              <FeatureIcon 
                icon={<Leaf className="w-6 h-6" />} 
                title="Real Testing" 
                text="We actually use everything we sell"
              />
              <FeatureIcon 
                icon={<Gauge className="w-6 h-6" />} 
                title="Honest Specs" 
                text="No exaggerated claims - just real performance"
              />
              <FeatureIcon 
                icon={<Package className="w-6 h-6" />} 
                title="Global Warranty" 
                text="Replacements handled worldwide"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Why Stoners Trust Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<Rocket className="w-8 h-8" />}
            title="Border Experience"
            text="Shipped to 47 countries last month. We know which carriers work best for herb gear."
          />
          <ValueCard 
            icon={<Shield className="w-8 h-8" />}
            title="Zero Hassle Returns"
            text="If your roller jams or grinder dulls too fast, we'll replace it - no lawyer-speak required."
          />
          <ValueCard 
            icon={<Package className="w-8 h-8" />}
            title="Real Customer Service"
            text="Actual humans reply within 24 hours. We'll even recommend alternatives if something's out of stock."
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-900 text-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Ready to Upgrade Your Setup?
          </h2>
          <p className="text-lg mb-8">
            We don't care if you're rolling tobacco or herbs - we just make sure 
            you get gear that works.
          </p>
          <a href='/shop' className="bg-white text-gray-900 px-8 py-3 font-medium rounded-md hover:bg-gray-100 transition-colors">
            Browse Gear (Worldwide Shipping)
          </a>
        </div>
      </section>
    </main>
  );
}

// Reusable Components (keep exactly the same as before)
function FeatureIcon({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg text-gray-600">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{text}</p>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow">
      <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center text-gray-600 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}