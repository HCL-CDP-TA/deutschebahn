import Image from "next/image";
import { 
  CreditCard, 
  Percent, 
  Train, 
  CalendarRange, 
  Euro 
} from "lucide-react";

const BahnCardIntro = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Your Smart Choice for Rail Travel
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Whether you travel occasionally or frequently, there's a BahnCard that's right for you.
            Enjoy significant discounts on Deutsche Bahn services all year round.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="https://images.pexels.com/photos/730134/pexels-photo-730134.jpeg" 
              alt="Person traveling by train" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Three Card Options</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Choose between BahnCard 25, 50, or 100 based on how often you travel and your preferred class.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                <Percent className="h-6 w-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Instant Savings</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Get 25%, 50%, or even 100% off the regular fare price on every journey you take.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                <Train className="h-6 w-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Valid for All Routes</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your BahnCard is valid on all Deutsche Bahn routes and many partner railways.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                <CalendarRange className="h-6 w-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">One Year Validity</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Enjoy benefits for a full year with automatic renewal option for continuous savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BahnCardIntro;