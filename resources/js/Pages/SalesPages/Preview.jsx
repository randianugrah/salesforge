import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MeshGradient } from "@paper-design/shaders-react";
import AILoadingOverlay from '@/Components/ui/AILoadingOverlay';

export default function Preview({ auth, salesPage, status }) {
    const { put, processing } = useForm({
        product_name: salesPage.product_name,
        product_description: salesPage.product_description,
        features: salesPage.features,
        target_audience: salesPage.target_audience,
        price: salesPage.price,
        usp: salesPage.usp,
        template: salesPage.template,
        category: salesPage.category,
    });

    const handleRegenerate = () => {
        put(route('sales-pages.update', salesPage.id));
    };

    const content = salesPage.generated_content || {};
    const template = salesPage.template || 'template_tech';

    // RENDER TECH / SAAS TEMPLATE
    const TemplateTech = () => (
        <div className="bg-[#0a0a0a] text-white selection:bg-purple-500/30 relative overflow-hidden font-sans">
            <div className="relative z-10">
                {/* Hero */}
                <header className="relative pt-32 pb-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-bold tracking-widest uppercase mb-8">
                            New Release
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white">
                            {salesPage.headline || 'Generating your headline...'}
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-purple-100/70 mb-12 leading-relaxed font-light">
                            {salesPage.sub_headline}
                        </p>
                        <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-2xl text-xl font-bold shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] transition-all hover:-translate-y-1 mb-20">
                            {content.cta || 'Get Started Now'}
                        </button>

                        <div className="relative mx-auto max-w-5xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] bg-black/50 aspect-video flex items-center justify-center">
                            <img src={`https://image.pollinations.ai/prompt/${encodeURIComponent((content.image_prompt || salesPage.product_name || 'Technology') + ' sleek modern high-tech aesthetic cinematic lighting')}?width=1200&height=675&nologo=true`} alt={salesPage.product_name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'; }} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Trust Badges */}
                <div className="py-10 border-y border-white/5 bg-white/5">
                    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale">
                        <div className="text-xl font-bold tracking-widest text-white">FORBES</div>
                        <div className="text-xl font-bold tracking-widest text-white">WIRED</div>
                        <div className="text-xl font-bold tracking-widest text-white">TECHCRUNCH</div>
                        <div className="text-xl font-bold tracking-widest text-white">FAST COMPANY</div>
                    </div>
                </div>

                {/* Benefits */}
                {content.benefits && (
                    <section className="py-32 bg-white/5 backdrop-blur-sm border-y border-white/5">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {content.benefits.map((benefit, i) => (
                                    <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-purple-500/50 backdrop-blur-md transition-all group hover:bg-white/10">
                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                                            <svg className="w-7 h-7 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <p className="text-xl font-bold leading-snug text-white">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Features */}
                {content.features_breakdown && (
                    <section className="py-32">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <div className="space-y-12">
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Crafted for Excellence.</h2>
                                    <div className="space-y-10">
                                        {content.features_breakdown.map((f, i) => (
                                            <div key={i} className="flex gap-6">
                                                <div className="shrink-0 w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400">{i + 1}</div>
                                                <div>
                                                    <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                                                    <p className="text-purple-100/60 leading-relaxed font-light">{f.detail}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 blur-[80px] opacity-30 animate-pulse"></div>
                                    <div className="relative bg-white/5 border border-white/10 p-4 rounded-[3rem] backdrop-blur-xl">
                                        <div className="aspect-square bg-black/50 rounded-[2.5rem] flex items-center justify-center border border-white/5">
                                            <svg className="w-24 h-24 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Testimonials */}
                <section className="py-32 bg-white/5 border-y border-white/5 backdrop-blur-md relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white tracking-tight">Loved by industry leaders.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {(content.testimonials || [
                                { name: "Sarah Jenkins", role: "CEO at TechFlow", content: "This product completely transformed how we operate. Unbelievable ROI within the first month." },
                                { name: "Marcus Chen", role: "Founder of StartupX", content: "The easiest setup I've ever experienced. Highly recommend this to any growing team." },
                                { name: "Elena Rodriguez", role: "Product Manager", content: "Their support team is unmatched. The features are exactly what we needed to scale." }
                            ]).map((t, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-black/40 border border-white/10 hover:border-purple-500/30 transition-all">
                                    <div className="flex gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
                                    </div>
                                    <p className="text-purple-100/80 mb-8 text-lg font-light leading-relaxed">"{t.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                                            <div className="w-full h-full bg-[#0a0a0a] rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{t.name}</h4>
                                            <p className="text-sm text-purple-400">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="py-32">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Simple, transparent pricing.</h2>
                            <p className="text-xl text-purple-100/60 font-light">Everything you need to get started.</p>
                        </div>

                        <div className="bg-white/5 border border-purple-500/30 rounded-[3rem] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full -mr-20 -mt-20"></div>

                            <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-3xl font-bold text-white mb-2">{content.pricing?.name || 'Pro Plan'}</h3>
                                    <div className="flex items-end gap-2 mb-8">
                                        <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{content.pricing?.price || salesPage.price || '$99'}</span>
                                        <span className="text-purple-100/60 text-lg mb-2">/{content.pricing?.period || 'month'}</span>
                                    </div>

                                    <ul className="space-y-4 mb-10">
                                        {(content.pricing?.features || ['Unlimited projects', '24/7 Priority Support', 'Custom domains', 'Advanced Analytics']).map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">✓</div>
                                                <span className="text-purple-100/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <button className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl text-xl font-bold shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)] hover:scale-105 transition-all">
                                        {content.cta || 'Get Started Now'}
                                    </button>
                                    <p className="text-center text-sm text-purple-100/40 mt-4">No credit card required. 14-day free trial.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 relative overflow-hidden border-t border-white/5">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-[120px] rounded-full -z-10"></div>
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight">Ready to boost your sales?</h2>
                        <p className="text-2xl text-purple-100/70 mb-12 font-light max-w-2xl mx-auto">Join the thousands of users who are already seeing results.</p>
                        <button className="px-12 py-6 bg-white text-[#0a0a0a] rounded-2xl text-2xl font-bold shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
                            {content.cta || 'Get Started Immediately'}
                        </button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 border-t border-white/10 text-center">
                    <p className="text-purple-100/40">© {new Date().getFullYear()} {salesPage.product_name}. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );

    // RENDER FASHION TEMPLATE
    const TemplateFashion = () => (
        <div className="bg-[#fafafa] text-gray-900 font-serif selection:bg-rose-100">
            <header className="pt-32 pb-32 text-center max-w-4xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
                    {salesPage.headline}
                </h1>
                <p className="text-xl text-gray-500 mb-12 font-sans italic">
                    {salesPage.sub_headline}
                </p>
                <button className="px-12 py-4 bg-gray-900 text-white text-sm font-sans tracking-widest uppercase hover:bg-gray-800 transition-all mb-16">
                    {content.cta || 'Discover More'}
                </button>

                <div className="w-full max-w-4xl mx-auto aspect-[4/3] bg-gray-100 mt-10 overflow-hidden shadow-2xl">
                    <img src={`https://image.pollinations.ai/prompt/${encodeURIComponent((content.image_prompt || salesPage.product_name || 'Fashion') + ' minimalist aesthetic fashion editorial high end Vogue style')}?width=1200&height=900&nologo=true`} alt={salesPage.product_name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'; }} className="w-full h-full object-cover grayscale-[20%]" />
                </div>
            </header>

            <section className="py-24 bg-white border-y border-gray-100">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                    {content.benefits?.map((b, i) => (
                        <div key={i} className="space-y-6">
                            <div className="w-px h-12 bg-gray-300 mx-auto"></div>
                            <h3 className="text-2xl font-light">{b}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-32 max-w-5xl mx-auto px-6">
                <div className="space-y-24">
                    {content.features_breakdown?.map((f, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                            <div className="md:w-1/4 font-light text-6xl text-gray-300">0{i + 1}</div>
                            <div className="md:w-3/4">
                                <h3 className="text-3xl font-light mb-4">{f.title}</h3>
                                <p className="text-gray-500 font-sans text-lg">{f.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gray-50 border-y border-gray-200">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-light text-center mb-16">What They Say</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {(content.testimonials || []).map((t, i) => (
                            <div key={i} className="text-center">
                                <p className="font-sans italic text-gray-500 mb-6">"{t.content}"</p>
                                <h4 className="font-bold tracking-widest uppercase text-xs">{t.name}</h4>
                                <span className="text-xs text-gray-400">{t.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            {content.pricing && (
                <section className="py-32 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-light mb-16">The Investment</h2>
                    <div className="bg-white border border-gray-200 p-16 shadow-2xl">
                        <h3 className="text-2xl font-light mb-2">{content.pricing.name}</h3>
                        <div className="text-6xl font-light my-8">{content.pricing.price}<span className="text-xl text-gray-400 font-sans">/{content.pricing.period}</span></div>
                        <ul className="space-y-4 mb-12 font-sans text-gray-500">
                            {(content.pricing.features || []).map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                        <button className="px-12 py-4 bg-gray-900 text-white text-sm font-sans tracking-widest uppercase hover:bg-gray-800 transition-all w-full">
                            {content.cta || 'Select Plan'}
                        </button>
                    </div>
                </section>
            )}
        </div>
    );

    // RENDER SERVICES TEMPLATE
    const TemplateServices = () => (
        <div className="bg-slate-50 text-slate-900 selection:bg-blue-200 font-sans">
            <header className="bg-blue-900 text-white pt-32 pb-48 text-center px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight">
                        {salesPage.headline}
                    </h1>
                    <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
                        {salesPage.sub_headline}
                    </p>
                    <button className="px-10 py-4 bg-blue-500 text-white rounded text-lg font-bold shadow-lg hover:bg-blue-400 transition-all mb-12">
                        {content.cta || 'Request Consultation'}
                    </button>

                    <div className="w-full max-w-3xl mx-auto aspect-[21/9] bg-blue-800 rounded-xl mt-10 overflow-hidden shadow-2xl border-4 border-blue-400/20">
                        <img src={`https://image.pollinations.ai/prompt/${encodeURIComponent((content.image_prompt || salesPage.product_name || 'Business') + ' professional corporate office environment premium')}?width=1200&height=500&nologo=true`} alt={salesPage.product_name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'; }} className="w-full h-full object-cover opacity-90 mix-blend-luminosity" />
                    </div>
                </div>
            </header>

            <section className="max-w-6xl mx-auto px-6 -mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {content.benefits?.map((b, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500 flex items-start gap-4">
                            <div className="text-blue-500 mt-1">✓</div>
                            <h3 className="text-lg font-bold text-slate-800">{b}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-32 max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.features_breakdown?.map((f, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-bold mb-3 text-blue-900">{f.title}</h3>
                            <p className="text-slate-600">{f.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-blue-900 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Client Success Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {(content.testimonials || []).map((t, i) => (
                            <div key={i} className="bg-blue-800 p-8 rounded-xl border border-blue-700 shadow-lg">
                                <div className="text-blue-400 mb-4 text-4xl">"</div>
                                <p className="text-blue-100 mb-6 italic">{t.content}</p>
                                <div>
                                    <h4 className="font-bold">{t.name}</h4>
                                    <span className="text-sm text-blue-300">{t.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            {content.pricing && (
                <section className="py-32 max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">Transparent Pricing</h2>
                    <div className="bg-white border-2 border-blue-500 rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
                        <div className="bg-blue-500 p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-2">{content.pricing.name}</h3>
                            <div className="text-5xl font-black">{content.pricing.price}<span className="text-lg text-blue-200 font-normal">/{content.pricing.period}</span></div>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4 mb-8">
                                {(content.pricing.features || []).map((f, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-blue-500 font-bold">✓</span>
                                        <span className="text-slate-600">{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all">
                                {content.cta || 'Get Started'}
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );

    // RENDER FOOD TEMPLATE
    const TemplateFood = () => (
        <div className="bg-[#fffdf7] text-orange-950 font-sans selection:bg-orange-200">
            <header className="pt-32 pb-32 text-center max-w-4xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-orange-600">
                    {salesPage.headline}
                </h1>
                <p className="text-xl md:text-2xl text-orange-900/70 mb-10">
                    {salesPage.sub_headline}
                </p>
                <button className="px-10 py-4 bg-orange-600 text-white rounded-full text-xl font-bold shadow-xl hover:bg-orange-500 transition-all transform hover:-translate-y-1 hover:shadow-orange-500/30 mb-16">
                    {content.cta || 'Order Now'}
                </button>

                <div className="w-full max-w-2xl mx-auto aspect-square bg-orange-100 rounded-full mt-8 overflow-hidden shadow-[0_20px_50px_-10px_rgba(234,88,12,0.3)] border-8 border-white">
                    <img src={`https://image.pollinations.ai/prompt/${encodeURIComponent((content.image_prompt || salesPage.product_name || 'Food') + ' appetizing food photography bright colors highly detailed menu photo')}?width=800&height=800&nologo=true`} alt={salesPage.product_name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop'; }} className="w-full h-full object-cover" />
                </div>
            </header>

            <section className="py-20 bg-orange-50">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {content.benefits?.map((b, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-orange-100">
                            <div className="text-4xl mb-4">🍽️</div>
                            <h3 className="text-xl font-bold">{b}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-32 max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {content.features_breakdown?.map((f, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <h3 className="text-2xl font-bold text-orange-600 border-b-2 border-orange-200 pb-2 inline-block w-fit">{f.title}</h3>
                            <p className="text-orange-900/80 text-lg leading-relaxed">{f.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white border-y border-orange-100">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-black text-center mb-16 text-orange-900">What People Are Saying</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(content.testimonials || [
                            { name: "Jessica Alba", role: "Food Blogger", content: "Absolutely delicious! The flavors are incredibly balanced. A must-try." },
                            { name: "David Chen", role: "Local Guide", content: "Best experience I've had in a long time. Will definitely come back again." },
                            { name: "Maria Garcia", role: "Customer", content: "High quality ingredients and perfect execution. Highly recommended!" }
                        ]).map((t, i) => (
                            <div key={i} className="bg-orange-50 p-8 rounded-3xl border border-orange-200 text-center shadow-sm">
                                <div className="text-orange-500 text-2xl mb-4">★★★★★</div>
                                <p className="text-orange-900/80 mb-6 italic text-lg leading-relaxed">"{t.content}"</p>
                                <h4 className="font-bold text-orange-900 text-lg">{t.name}</h4>
                                <p className="text-sm text-orange-600">{t.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing / Menu */}
            <section className="py-32 max-w-4xl mx-auto px-6 text-center">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-orange-900 mb-4">Today's Special</h2>
                    <p className="text-xl text-orange-900/60">Treat yourself to the best.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden transform hover:-translate-y-2 transition-all">
                    <div className="absolute top-0 right-0 text-[15rem] opacity-10 -mt-20 -mr-10 mix-blend-overlay">🔥</div>
                    <h3 className="text-3xl font-bold mb-2 relative z-10">{content.pricing?.name || 'Chef\'s Signature'}</h3>
                    <div className="text-7xl font-black mb-8 relative z-10 drop-shadow-md">{content.pricing?.price || salesPage.price || '$25'}</div>
                    <ul className="space-y-4 mb-10 text-lg relative z-10 max-w-sm mx-auto">
                        {(content.pricing?.features || ['Fresh Premium Ingredients', 'Free Delivery included', 'Secret Recipe Sauce']).map((feature, i) => (
                            <li key={i} className="flex items-center justify-center gap-3">
                                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="px-12 py-5 bg-white text-orange-600 rounded-full text-xl font-bold shadow-xl hover:scale-105 transition-transform relative z-10 w-full md:w-auto">
                        {content.cta || 'Order Now'}
                    </button>
                </div>
            </section>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <Head title={`Preview: ${salesPage.product_name}`} />
            <AILoadingOverlay isVisible={processing} />

            {/* Owner Toolbar */}
            {auth.user.id === salesPage.user_id && (
                <div className="bg-[#000000]/80 backdrop-blur-xl border-b border-white/10 py-3 sticky top-16 z-50 shadow-xl">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-300 flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                            </span>
                            <span className="font-bold text-white tracking-wide">LIVE PREVIEW:</span>
                            <span className="uppercase text-cyan-400 font-black">{template.replace('_', ' ')}</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <a
                                href={route('sales-pages.export', salesPage.id)}
                                className="text-sm font-bold text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 border border-green-400/30 px-3 py-1.5 rounded-lg hover:bg-green-400/10"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Export HTML
                            </a>
                            <Link href={route('sales-pages.edit', salesPage.id)} className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 px-3 py-1.5 border border-white/5 rounded-lg hover:bg-white/5">
                                Edit Settings
                            </Link>
                            <button
                                onClick={handleRegenerate}
                                disabled={processing}
                                className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 rounded-full hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)] disabled:opacity-50"
                            >
                                {processing ? 'Regenerating...' : 'Regenerate Content'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Conditional Template Rendering */}
            <div className="min-h-screen">
                {template === 'template_tech' && <TemplateTech />}
                {template === 'template_fashion' && <TemplateFashion />}
                {template === 'template_services' && <TemplateServices />}
                {template === 'template_food' && <TemplateFood />}
            </div>

            {status && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce">
                    {status}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
