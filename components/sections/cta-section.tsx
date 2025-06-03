import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:flex-1">
              <Badge variant="outline" className="bg-red-600/20 text-red-300 border-red-800/30 mb-4">
                Limited Time Offer
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Get Your BahnCard Today
              </h2>
              <p className="text-slate-300 mb-8">
                Start saving on your next journey with a BahnCard that suits your travel needs. Special 3-month trial options available with no automatic renewal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Buy Now
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Calculate Savings <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="md:flex-1">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Why get a BahnCard?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <span className="text-red-500 font-bold">•</span>
                    <span className="text-slate-300">Save up to 50% on regular fares</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-red-500 font-bold">•</span>
                    <span className="text-slate-300">Exclusive access to special offers</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-red-500 font-bold">•</span>
                    <span className="text-slate-300">Rewards and partner benefits</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-red-500 font-bold">•</span>
                    <span className="text-slate-300">Contribute to eco-friendly travel</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">No risk with our trial option</p>
                      <p className="text-slate-400 text-xs">3 months, no automatic renewal</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                      <span className="text-red-400 text-xs">Available now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;