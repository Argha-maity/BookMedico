import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { 
  Check, Sparkles, ShieldCheck, Zap, 
  Clock, CreditCard, Star, Crown, ChevronRight,
  User as UserIcon
} from "lucide-react";

const Membership = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      price: billingCycle === "monthly" ? "0" : "0",
      description: "Essential healthcare access for everyone.",
      icon: <ShieldCheck className="text-slate-400" size={24} />,
      features: ["Unlimited Appointment Booking", "Basic Health Vault (50MB)", "Nearby Store Locator", "Community Support"],
      color: "border-slate-100",
      btnText: "Current Plan",
      premium: false
    },
    {
      name: "Pro Care",
      price: billingCycle === "monthly" ? "499" : "4499",
      description: "Priority access and advanced digital tools.",
      icon: <Zap className="text-primary" size={24} />,
      features: ["Priority Doctor Queue", "AI Symptom Analyzer", "Vault Storage (5GB)", "24/7 Virtual Consultation", "10% Pharmacy Discount"],
      color: "border-primary/30 shadow-xl shadow-primary/10",
      btnText: "Upgrade to Pro",
      premium: true,
      popular: true
    },
    {
      name: "Elite Family",
      price: billingCycle === "monthly" ? "999" : "8999",
      description: "Complete coverage for your entire family.",
      icon: <Crown className="text-amber-500" size={24} />,
      features: ["Up to 4 Family Members", "Home Sample Collection", "Personal Health Manager", "Premium AI Insights", "Free Medicine Delivery"],
      color: "border-amber-200",
      btnText: "Get Elite Access",
      premium: true
    }
  ];

  return (
    <DashboardLayout role="patient">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Choose Your Health Plan</h2>
        <p className="text-slate-500 font-medium">Invest in your wellness with plans designed to make healthcare faster, smarter, and more affordable.</p>
        
        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 bg-slate-900 rounded-full relative p-1 transition-all"
          >
            <div className={`w-6 h-6 bg-primary rounded-full transition-all ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-400'}`}>
            Yearly <span className="text-emerald-500 text-[10px] ml-1">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`bg-white rounded-[3rem] p-10 border-2 transition-all relative flex flex-col ${plan.color} ${plan.popular ? 'scale-105 z-10' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} className="text-primary"/> Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className="mb-4">{plan.icon}</div>
              <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
              <p className="text-sm text-slate-400 font-medium mt-2">{plan.description}</p>
            </div>

            <div className="mb-10">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black text-slate-900">₹{plan.price}</span>
                <span className="text-slate-400 font-bold text-sm mb-1">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
            </div>

            <div className="space-y-4 flex-1 mb-10">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className={`mt-1 p-0.5 rounded-full ${plan.premium ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-sm font-bold text-slate-600 leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all cursor-pointer ${
              plan.popular 
              ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:scale-[1.02]' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}>
              {plan.btnText}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Footer */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
            <CreditCard className="text-primary" size={32}/>
          </div>
          <div>
            <h4 className="text-xl font-bold">Secure Payment Processing</h4>
            <p className="text-slate-400 text-sm">Encrypted transactions via Stripe and Razorpay.</p>
          </div>
        </div>
        <div className="flex -space-x-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center font-bold text-xs">
              <UserIcon size={16}/>
            </div>
          ))}
          <div className="pl-8 flex flex-col justify-center">
             <p className="text-xs font-black">Join 2,400+ users</p>
             <p className="text-[10px] text-primary font-bold">Trusting MediConnect</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Membership;