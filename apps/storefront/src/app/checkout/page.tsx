import Link from 'next/link';
import { ShieldCheck, CreditCard, Truck, ArrowLeft, Lock, Star, ChevronDown, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      {/* 🚀 Header (Flipkart Checkout Header is simpler) */}
      <header className="bg-[#2874f0] text-white py-2 sticky top-0 z-[100] shadow-md">
        <div className="max-w-[1248px] mx-auto flex items-center h-12 px-4 lg:px-0">
          <Link href="/" className="flex flex-col items-end">
            <span className="text-xl italic font-black -mb-1 leading-none">Flipkart</span>
            <span className="text-[11px] italic font-bold flex items-center gap-1 opacity-90">
              Explore <span className="text-[#ffe500]">Plus</span> <Star className="w-2.5 h-2.5 text-[#ffe500] fill-[#ffe500]" />
            </span>
          </Link>
          <div className="ml-10 text-lg font-bold text-gray-100 italic opacity-80 uppercase tracking-widest hidden md:block">
            Checkout
          </div>
        </div>
      </header>

      {/* 📦 Checkout Content */}
      <main className="max-w-[1248px] mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Steps */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Step 1: Login (Completed) */}
          <section className="bg-white shadow-sm rounded-sm">
            <div className="bg-[#2874f0] text-white px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="bg-gray-100 text-[#2874f0] w-6 h-6 rounded-xs flex items-center justify-center text-[11px] font-bold">1</span>
                <h2 className="text-sm font-bold uppercase tracking-wide opacity-90">Login</h2>
                <CheckCircle2 className="w-5 h-5 text-white fill-white/20" />
              </div>
              <button className="text-[12px] font-bold bg-white text-[#2874f0] px-4 py-1.5 rounded-sm border border-gray-200">
                CHANGE
              </button>
            </div>
            <div className="p-4 px-16 text-sm font-bold text-gray-800">
              Suraj Kumar <span className="text-gray-400 font-medium ml-2">+91 9876543210</span>
            </div>
          </section>

          {/* Step 2: Delivery Address (Active) */}
          <section className="bg-white shadow-sm rounded-sm overflow-hidden border border-blue-500/20">
            <div className="bg-[#2874f0] text-white px-6 py-3 flex items-center gap-4">
               <span className="bg-white text-[#2874f0] w-6 h-6 rounded-xs flex items-center justify-center text-[11px] font-bold">2</span>
               <h2 className="text-sm font-bold uppercase tracking-wide">Delivery Address</h2>
            </div>
            
            <div className="p-6 space-y-6">
                <div className="flex items-start gap-4 p-4 border border-blue-500 bg-blue-50/30 rounded-sm">
                    <div className="w-4 h-4 rounded-full border-4 border-blue-600 mt-1 cursor-pointer"></div>
                    <div className="space-y-2">
                        <div className="flex gap-4 items-center">
                            <span className="font-bold text-sm">Suraj Kumar</span>
                            <span className="bg-gray-200 text-[10px] font-bold px-2 py-0.5 rounded-sm text-gray-600">HOME</span>
                            <span className="font-bold text-sm ml-2">9876543210</span>
                        </div>
                        <p className="text-[13px] text-gray-700 leading-relaxed">
                            C-21, 4th Floor, Tech Park Towers, Whitefield, Bengaluru, Karnataka - 560066
                        </p>
                        <button className="bg-[#fb641b] text-white font-bold py-3 px-10 text-sm rounded-sm shadow-md mt-4 uppercase">
                            Deliver Here
                        </button>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center gap-4 text-[#2874f0] font-bold text-sm cursor-pointer hover:bg-gray-50">
                    <span className="text-xl">+</span> Add a new address
                </div>
            </div>
          </section>

          {/* Step 3: Order Summary (Locked) */}
          <section className="bg-white shadow-sm rounded-sm opacity-60">
             <div className="bg-gray-100 text-gray-400 px-6 py-4 flex items-center gap-4">
                <span className="bg-gray-200 text-gray-400 w-6 h-6 rounded-xs flex items-center justify-center text-[11px] font-bold">3</span>
                <h2 className="text-sm font-bold uppercase tracking-wide">Order Summary</h2>
             </div>
          </section>

          {/* Step 4: Payment Options (Locked) */}
          <section className="bg-white shadow-sm rounded-sm opacity-60">
             <div className="bg-gray-100 text-gray-400 px-6 py-4 flex items-center gap-4">
                <span className="bg-gray-200 text-gray-400 w-6 h-6 rounded-xs flex items-center justify-center text-[11px] font-bold">4</span>
                <h2 className="text-sm font-bold uppercase tracking-wide">Payment Options</h2>
             </div>
          </section>

        </div>

        {/* Right Column: Price Details */}
        <div className="lg:col-span-4">
           <div className="bg-white shadow-sm rounded-sm sticky top-20">
              <h3 className="text-[#878787] font-bold uppercase p-4 border-b text-sm tracking-wide">Price Details</h3>
              
              <div className="p-5 space-y-4 text-sm font-medium border-b">
                 <div className="flex justify-between">
                    <span>Price (2 items)</span>
                    <span>₹15,998</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-[#388e3c]">-₹5,999</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-[#388e3c]">FREE</span>
                 </div>
                 <div className="flex justify-between border-t border-dashed pt-4 mt-2">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-lg font-bold text-gray-800">₹9,999</span>
                 </div>
              </div>

              <div className="p-4 px-5">
                  <p className="text-[#388e3c] font-bold text-sm">
                      You will save ₹6,000 on this order
                  </p>
              </div>
           </div>

           <div className="mt-6 flex flex-col gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-4">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 opacity-40 text-gray-700" />
                    <span>Safe and Secure Payments. 100% Authentic products.</span>
                </div>
           </div>
        </div>

      </main>

      {/* 🧭 Footer */}
      <footer className="bg-white border-t py-6 mt-12">
          <div className="max-w-[1248px] mx-auto flex justify-between px-4 text-xs font-medium text-gray-500">
              <div className="flex gap-10">
                  <span>Policies: Returns Policy | Terms of use | Security | Privacy</span>
              </div>
              <span>© 2007-2024 Flipkart.com</span>
          </div>
      </footer>
    </div>
  );
}
