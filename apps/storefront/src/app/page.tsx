import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, Star, ChevronDown, ChevronRight, Zap } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Grocery', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/29327f40e3c48330.png' },
    { name: 'Mobiles', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png' },
    { name: 'Fashion', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png' },
    { name: 'Electronics', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/69cff0586e0c651e.png' },
    { name: 'Home', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/ab7e2c021f97s0b.png' },
    { name: 'Appliances', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/0ff10a8d76d49ca.png' },
    { name: 'Travel', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/71050627a56114a8.png' },
    { name: 'Beauty & Toys', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c.png' }
  ];

  const electronics = [
    { name: 'Premium Audio', price: '4,999', brand: 'JBL, Sony & more', img: '/audio.png' },
    { name: 'Mobiles', price: '9,999', brand: 'Samsung, Apple', img: '/mobiles.png' },
    { name: 'Laptops', price: '24,990', brand: 'HP, Dell', img: '/laptops.png' },
    { name: 'Camera', price: '2,999', brand: 'Canon, Fujifilm', img: '/cameras.png' },
    { name: 'Tablets', price: '12,999', brand: 'Lenovo, Samsung', img: '/tablets.png' },
    { name: 'Watch', price: '1,999', brand: 'Noise, Fire-Boltt', img: '/watch.png' }
  ];

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      {/* 🚀 Header */}
      <header className="bg-[#2874f0] text-white py-2 sticky top-0 z-[100] shadow-md">
        <div className="max-w-[1248px] mx-auto flex items-center h-12 gap-10 px-2 lg:px-0">
          
          {/* Logo Section */}
          <Link href="/" className="flex flex-col items-end">
            <span className="text-xl italic font-black -mb-1 leading-none">Flipkart</span>
            <span className="text-[11px] italic font-bold flex items-center gap-1 opacity-90">
              Explore <span className="text-[#ffe500]">Plus</span> <Star className="w-2.5 h-2.5 text-[#ffe500] fill-[#ffe500]" />
            </span>
          </Link>

          {/* 🔍 Search Bar */}
          <div className="flex-grow flex relative max-w-xl group">
            <input 
              type="text" 
              placeholder="Search for products, brands and more" 
              className="w-full px-4 py-2 text-sm text-black focus:outline-none rounded-sm shadow-inner"
            />
            <button className="bg-white px-3 flex items-center absolute right-0 top-0 h-full rounded-r-sm">
                <Search className="w-5 h-5 text-[#2874f0]" />
            </button>
          </div>

          {/* Links Section */}
          <div className="flex items-center gap-10 text-sm font-bold ml-auto">
            <button className="bg-white text-[#2874f0] px-10 py-1 rounded-sm hover:shadow-lg">
              Login
            </button>
            
            <Link href="/seller" className="hidden xl:block whitespace-nowrap">
              Become a Seller
            </Link>

            <button className="flex items-center gap-1">
              More <ChevronDown className="w-4 h-4" />
            </button>

            <Link href="/cart" className="flex items-center gap-2 relative">
              <ShoppingCart className="w-5 h-5" />
              Cart
              <span className="absolute -top-1.5 -right-2 bg-[#fb641b] text-[10px] rounded-full px-1.5 py-0.5 border border-white">0</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 📦 Categories Bar */}
      <div className="bg-white shadow-sm mb-2 h-28 hidden md:block border-b">
        <div className="max-w-[1248px] mx-auto px-4 flex justify-between h-full items-center">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-1 cursor-pointer group px-2">
              <div className="w-16 h-16 relative transition-transform group-hover:scale-105">
                <div className="absolute inset-0 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-110 transition-opacity"></div>
                {/* Use placeholders if URL icons fail */}
                <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <span className="text-[14px] font-bold text-[#212121] group-hover:text-[#2874f0]">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🖼️ Hero Slider (Static for Reference) */}
      <section className="px-2 mb-2">
        <div className="max-w-[1248px] mx-auto bg-white shadow py-2 h-[280px] w-full relative group">
            <div className="absolute inset-0 bg-blue-100 flex items-center justify-between px-10">
                <div className="flex flex-col gap-4">
                    <span className="text-4xl md:text-6xl font-black text-blue-900 drop-shadow-sm uppercase">Big Savings Days</span>
                    <p className="text-blue-800 text-xl font-bold italic">Top Deals on Gen-AI Headphones & Laptops</p>
                    <button className="bg-[#fb641b] text-white px-10 py-3 font-bold text-lg rounded-sm self-start shadow-xl animate-pulse">
                        SHOP NOW
                    </button>
                    <p className="text-[9px] text-[#878787]">*T&C Apply | Sale ends in <span className="text-red-600 font-bold">12:34:56</span></p>
                </div>
            </div>
            {/* Arrows */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-6 py-10 shadow transition-opacity opacity-0 group-hover:opacity-100 rounded-r-md">
                <ChevronRight className="w-6 h-6 rotate-180 text-gray-800" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-6 py-10 shadow transition-opacity opacity-0 group-hover:opacity-100 rounded-l-md">
                <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
        </div>
      </section>

      {/* 🏷️ Best of Electronics - Horizontal Slide Component */}
      <section className="px-2 mb-2">
        <div className="max-w-[1248px] mx-auto bg-white shadow-sm rounded-sm">
            {/* Featured Section Header */}
            <div className="flex justify-between items-center p-5 border-b-2 border-gray-50">
                <div>
                  <h2 className="text-[22px] font-bold text-[#212121]">Best of Electronics</h2>
                  <p className="text-[#878787] text-sm font-medium mt-1">High fidelity, extreme performance</p>
                </div>
                <button className="bg-[#2874f0] text-white px-6 py-2.5 text-sm font-bold rounded-sm shadow-md hover:bg-blue-600">
                    VIEW ALL
                </button>
            </div>

            {/* Product Cards Row */}
            <div className="flex overflow-x-auto p-4 gap-4 no-scrollbar">
                {electronics.map((item, i) => (
                    <div key={i} className="flex-none w-[200px] border border-transparent hover:border-gray-50 flex flex-col items-center gap-4 py-8 group">
                        <div className="relative h-44 w-full px-4 overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 bg-gray-50 rounded-md transition-transform group-hover:scale-105"></div>
                            {/* Product placeholder image */}
                            <div className="w-full h-full flex items-center justify-center p-4">
                                <Zap className="w-16 h-16 text-blue-500 transition-rotate group-hover:rotate-12" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-bold text-[#212121] leading-tight group-hover:text-[#2874f0] transition-colors">{item.name}</h3>
                            <p className="text-[#388e3c] font-bold py-1">From ₹{item.price}</p>
                            <p className="text-[#878787] text-xs font-semibold uppercase tracking-tight">{item.brand}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 🛒 Main Product List with "Add to Cart" interactions */}
      <section className="px-2 mb-8">
        <div className="max-w-[1248px] mx-auto bg-white p-5 shadow-sm rounded-sm">
            <h2 className="text-xl font-bold mb-6 border-l-4 border-blue-500 pl-3">Top Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex flex-col border border-gray-100 p-4 rounded hover:shadow-xl transition-all group overflow-hidden relative">
                    {/* Discount badge */}
                    <div className="absolute top-2 left-2 bg-[#ff9f00] text-white text-[10px] font-black px-2 py-0.5 rounded-full z-10 shadow-sm">
                        TOP DEAL
                    </div>

                    <div className="relative h-60 w-full mb-4 bg-gray-50 flex items-center justify-center overflow-hidden rounded-sm group-hover:animate-pulse">
                        <Zap className="w-20 h-20 text-blue-400 group-hover:scale-110 transition-transform" />
                    </div>
                    
                    <div className="space-y-2 flex-grow">
                        <h3 className="text-[15px] font-bold text-[#212121] line-clamp-1 group-hover:text-blue-500 transition-colors">Quantum Headphones Gen-{i} Plus Max (Wireless)</h3>
                        
                        <div className="flex items-center gap-2">
                             <div className="bg-[#388e3c] text-white text-xs font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                                4.3 <Star className="w-2.5 h-2.5 fill-white" />
                             </div>
                             <span className="text-xs text-gray-400 font-bold">(5,231)</span>
                             <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Image src="/fassured.png" alt="FAssured" width={60} height={20} className="object-contain" />
                                <div className="text-[10px] font-black italic text-blue-600 border border-blue-400 px-1 py-0.5 rounded bg-blue-50 ml-1">F-Assured</div>
                             </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-[18px] font-black">₹4,999</span>
                            <span className="text-sm text-gray-400 line-through">₹7,999</span>
                            <span className="text-xs text-[#388e3c] font-black">37% off</span>
                        </div>

                        <div className="text-xs text-[#212121] italic font-semibold">
                            Free delivery <span className="line-through text-gray-400 px-1">₹40</span>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-[#ff9f00] text-white text-xs font-black py-3 rounded-sm shadow-sm hover:shadow active:scale-95 transition-all">
                            ADD TO CART
                        </button>
                        <button className="flex-1 bg-[#fb641b] text-white text-xs font-black py-3 rounded-sm shadow-sm hover:shadow active:scale-95 transition-all">
                            BUY NOW
                        </button>
                    </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* 🧭 Footer - Professional Flipkart Dark Footer */}
      <footer className="bg-[#212121] text-white py-12 px-6">
          <div className="max-w-[1248px] mx-auto grid grid-cols-2 lg:grid-cols-6 gap-x-14 gap-y-10 text-xs">
              <div className="space-y-4">
                  <h4 className="text-[#878787] font-bold uppercase tracking-widest text-[11px]">About</h4>
                  <div className="flex flex-col gap-2 font-medium">
                      <span>Contact Us</span>
                      <span>About Us</span>
                      <span>Careers</span>
                      <span>Flipkart Stories</span>
                      <span>Press</span>
                      <span>Corporate Information</span>
                  </div>
              </div>
              <div className="space-y-4">
                  <h4 className="text-[#878787] font-bold uppercase tracking-widest text-[11px]">Help</h4>
                  <div className="flex flex-col gap-2 font-medium">
                      <span>Payments</span>
                      <span>Shipping</span>
                      <span>Cancellation & Returns</span>
                      <span>FAQ</span>
                      <span>Report Infringement</span>
                  </div>
              </div>
              <div className="space-y-4">
                  <h4 className="text-[#878787] font-bold uppercase tracking-widest text-[11px]">Consumer Policy</h4>
                  <div className="flex flex-col gap-2 font-medium">
                      <span>Cancellation & Returns</span>
                      <span>Terms Of Use</span>
                      <span>Security</span>
                      <span>Privacy</span>
                      <span>Sitemap</span>
                  </div>
              </div>
              <div className="space-y-4">
                  <h4 className="text-[#878787] font-bold uppercase tracking-widest text-[11px]">Social</h4>
                  <div className="flex flex-col gap-2 font-medium">
                      <span>Facebook</span>
                      <span>Twitter</span>
                      <span>YouTube</span>
                  </div>
              </div>
              
              <div className="col-span-2 border-l border-[#454d5e] pl-10 space-y-4 hidden lg:block">
                  <h4 className="text-[#878787] font-bold uppercase tracking-widest text-[11px]">Mail Us:</h4>
                  <p className="text-[11px] leading-relaxed opacity-80 decoration-none">
                      Flipkart Internet Private Limited, <br />
                      Buildings Alyssa, Begonia & <br />
                      Clove Embassy Tech Village, <br />
                      Outer Ring Road, Devarabeesanahalli Village, <br />
                      Bengaluru, 560103, Karnataka, India
                  </p>
              </div>
          </div>
          
          <div className="max-w-[1248px] mx-auto mt-12 pt-8 border-t border-[#454d5e] flex flex-wrap justify-between gap-6 text-[11px] font-bold">
              <div className="flex items-center gap-2 text-white">
                  <Menu className="w-4 h-4 text-[#ffe500]" />
                  <span>Become a Seller</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                  <Zap className="w-4 h-4 text-[#ffe500]" />
                  <span>Advertise</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                  <Star className="w-4 h-4 text-[#ffe500]" />
                  <span>Gift Cards</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                  <ChevronDown className="w-4 h-4 text-[#ffe500]" />
                  <span>Help Center</span>
              </div>
              <p className="opacity-80">© 2007-2024 Flipkart.com</p>
              <Image src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c4544e.svg" alt="Payments" width={300} height={30} className="object-contain" />
          </div>
      </footer>
    </div>
  );
}
