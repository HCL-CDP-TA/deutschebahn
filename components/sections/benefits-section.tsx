import { Card, CardContent } from "@/components/ui/card";
import { PercentIcon, CreditCard, Leaf, Train, Clock, Gift, Heart, Users } from "lucide-react";
import Image from "next/image";

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Benefits Beyond Discounts
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Your BahnCard offers more than just fare reductions. Discover the full range of benefits and additional perks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 transform transition-transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-950 p-3 rounded-full">
                  <Leaf className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Eco-Friendly Travel</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Rail travel with DB produces up to 75% less CO₂ than car travel and 90% less than flights. Your BahnCard helps make sustainable travel more affordable.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 transform transition-transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-950 p-3 rounded-full">
                  <Train className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">City-Ticket Included</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    With BahnCard 100 and BahnCard 50 (1st class), enjoy free public transport at your destination in over 130 German cities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 transform transition-transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-950 p-3 rounded-full">
                  <Gift className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Partner Benefits</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Enjoy exclusive discounts with our partners including car rentals, hotels, and attractions throughout Germany and Europe.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg" 
                alt="DB lounge for BahnCard holders" 
                className="object-cover"
                width={600}
                height={450}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">DB Lounge Access</h3>
                <p className="text-white/90">
                  BahnCard 50 (1st class) and BahnCard 100 holders enjoy exclusive access to DB Lounges.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 dark:bg-red-950 p-4 rounded-full">
                  <Clock className="h-8 w-8 text-red-600 dark:text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Time-Saving</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Skip the ticket lines and board directly with your BahnCard. Digital cards are available in the DB Navigator app.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 dark:bg-red-950 p-4 rounded-full">
                  <Heart className="h-8 w-8 text-red-600 dark:text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Loyalty Rewards</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Earn BahnBonus points with every journey. Redeem for free tickets, upgrades, or exclusive rewards.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 dark:bg-red-950 p-4 rounded-full">
                  <Users className="h-8 w-8 text-red-600 dark:text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Family Benefits</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Children under 15 travel free when accompanied by parents or grandparents with a BahnCard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;