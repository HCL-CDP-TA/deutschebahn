"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const pricingData = {
  adult: {
    "2nd": {
      bahnCard25: {
        regular: 59.90,
        monthly: 5.90,
        trial: 17.90,
      },
      bahnCard50: {
        regular: 244,
        monthly: 20.90,
        trial: 79,
      },
      bahnCard100: {
        regular: 4399,
        monthly: 383,
      },
    },
    "1st": {
      bahnCard25: {
        regular: 125,
        monthly: 12.50,
        trial: 37.90,
      },
      bahnCard50: {
        regular: 492,
        monthly: 42.90,
        trial: 159,
      },
      bahnCard100: {
        regular: 7699,
        monthly: 683,
      },
    },
  },
  youth: {
    "2nd": {
      bahnCard25: {
        regular: 39.90,
        monthly: 3.90,
        trial: 9.90,
      },
      bahnCard50: {
        regular: 122,
        monthly: 10.90,
        trial: 39,
      },
      bahnCard100: {
        regular: 2799,
        monthly: 246,
      },
    },
    "1st": {
      bahnCard25: {
        regular: 79.90,
        monthly: 7.50,
        trial: 19.90,
      },
      bahnCard50: {
        regular: 246,
        monthly: 21.90,
        trial: 79,
      },
      bahnCard100: {
        regular: 4899,
        monthly: 429,
      },
    },
  },
  senior: {
    "2nd": {
      bahnCard25: {
        regular: 39.90,
        monthly: 3.90,
        trial: 9.90,
      },
      bahnCard50: {
        regular: 122,
        monthly: 10.90,
        trial: 39,
      },
      bahnCard100: {
        regular: 3599,
        monthly: 319,
      },
    },
    "1st": {
      bahnCard25: {
        regular: 79.90,
        monthly: 7.50,
        trial: 19.90,
      },
      bahnCard50: {
        regular: 246,
        monthly: 21.90,
        trial: 79,
      },
      bahnCard100: {
        regular: 6299,
        monthly: 556,
      },
    },
  },
};

const PricingSection = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<"adult" | "youth" | "senior">("adult");
  const [selectedClass, setSelectedClass] = useState<"2nd" | "1st">("2nd");

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Pricing Plans</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Choose the right BahnCard for your needs. Special rates available for youth (under 27) and seniors (over 65).
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="adult" onValueChange={(value) => setSelectedCustomer(value as "adult" | "youth" | "senior")}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="adult">Adults</TabsTrigger>
              <TabsTrigger value="youth">Youth</TabsTrigger>
              <TabsTrigger value="senior">Seniors</TabsTrigger>
            </TabsList>

            {["adult", "youth", "senior"].map((customer) => (
              <TabsContent key={customer} value={customer} className="space-y-8">
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center rounded-md border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedClass("2nd")}
                      className={`px-4 py-2 text-sm ${
                        selectedClass === "2nd"
                          ? "bg-red-600 text-white"
                          : "bg-transparent text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      2nd Class
                    </button>
                    <button
                      onClick={() => setSelectedClass("1st")}
                      className={`px-4 py-2 text-sm ${
                        selectedClass === "1st"
                          ? "bg-red-600 text-white"
                          : "bg-transparent text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      1st Class
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* BahnCard 25 */}
                  <PricingCard
                    title="BahnCard 25"
                    regularPrice={pricingData[selectedCustomer as keyof typeof pricingData][selectedClass].bahnCard25.regular}
                    monthlyPrice={pricingData[selectedCustomer as keyof typeof pricingData][selectedClass].bahnCard25.monthly}
                    trialPrice={pricingData[selectedCustomer as keyof typeof pricingData][selectedClass].bahnCard25.trial}
                    discount="25%"
                    borderColor="border-amber-500"
                    benefits={[
                      "25% discount on all Flexpreis tickets",
                      "25% discount on Sparpreis tickets",
                      "Valid for 1 year from purchase",
                      "Discounts with DB partner railways"
                    ]}
                  />
                  
                  {/* BahnCard 50 */}
                  <PricingCard
                    title="BahnCard 50"
                    regularPrice={pricingData[selectedCustomer as keyof typeof pricingData][selectedClass].bahnCard50.regular}
                    monthlyPrice={pricingData[selectedCustomer as keyof typeof pricingData][selectedClass].bahnCard50.monthly}
                    trialPrice={pricingData[selectedCustomer as keyof typeof pricingData][selectedClass].bahnCard50.trial}
                    discount="50%"
                    borderColor="border-red-600"
                    benefits={[
                      "50% discount on all Flexpreis tickets",
                      "25% discount on Sparpreis tickets",
                      "Access to DB Lounges (1st Class)",
                      "City-Ticket included (1st Class)"
                    ]}
                    recommended={true}
                  />
                  
                  {/* BahnCard 100 */}
                  <PricingCard
                    title="BahnCard 100"
                    regularPrice={pricingData[selectedCustomer as keyof typeof pricingData][selectedClass].bahnCard100.regular}
                    monthlyPrice={pricingData[selectedCustomer as keyof typeof pricingData][selectedClass].bahnCard100.monthly}
                    discount="100%"
                    borderColor="border-slate-800 dark:border-slate-600"
                    benefits={[
                      "Free travel on all DB routes",
                      "City-Ticket included for local transport",
                      "Guaranteed seat (1st Class)",
                      "DB Lounge access in major stations"
                    ]}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-16 bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-3">Pricing Notes</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-500 font-bold">•</span>
                <span>
                  All prices are in Euros and include applicable taxes.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-500 font-bold">•</span>
                <span>
                  Trial BahnCards are valid for 3 months without automatic renewal.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-500 font-bold">•</span>
                <span>
                  Youth rates apply to customers under 27 years of age.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-500 font-bold">•</span>
                <span>
                  Senior rates apply to customers 65 years and older.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  title: string;
  regularPrice: number;
  monthlyPrice: number;
  trialPrice?: number;
  discount: string;
  borderColor: string;
  benefits: string[];
  recommended?: boolean;
}

const PricingCard = ({
  title,
  regularPrice,
  monthlyPrice,
  trialPrice,
  discount,
  borderColor,
  benefits,
  recommended = false,
}: PricingCardProps) => {
  return (
    <div className={`border ${borderColor} rounded-lg overflow-hidden bg-white dark:bg-slate-850 shadow-md relative ${
      recommended ? "transform md:-translate-y-4" : ""
    }`}>
      {recommended && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline mb-1">
          <span className="text-3xl font-bold">€{regularPrice.toFixed(2)}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">per year</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          or €{monthlyPrice.toFixed(2)}/month
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-500 px-2 py-1 rounded-md">
            {discount} discount
          </span>
          
          {trialPrice && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <span>Trial: €{trialPrice.toFixed(2)}</span>
                    <Info className="h-4 w-4 ml-1" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>3-month trial without automatic renewal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <ul className="space-y-3 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-green-600 dark:text-green-500 font-bold mt-0.5">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <div className="space-y-2">
          <Button variant="default" className={`w-full ${
            recommended ? "bg-red-600 hover:bg-red-700" : ""
          }`}>
            Buy {title}
          </Button>
          
          {trialPrice && (
            <Button variant="outline" className="w-full text-sm">
              Try 3-Month Trial
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;