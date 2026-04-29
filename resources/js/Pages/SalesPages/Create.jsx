import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MeshGradient } from "@paper-design/shaders-react";
import AILoadingOverlay from '@/Components/ui/AILoadingOverlay';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        product_name: '',
        product_description: '',
        features: '',
        target_audience: '',
        price: '',
        usp: '',
        template: 'template_tech', // default
        category: 'tech', // default
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sales-pages.store'));
    };

    const categories = [
        {
            id: 'tech', name: 'Technology / SaaS', template: 'template_tech', icon: '💻', placeholders: {
                name: 'e.g. SalesForge AI Tool',
                description: "Build beautiful, high-converting landing pages in minutes with SalesForge's drag-and-drop AI builder.",
                price: 'e.g. $29/month',
                usp: 'Get access to high-quality conversion optimized landing pages with zero code requirement.',
                features: 'e.g. AI-Powered, Real-time Analytics, Cloud Sync',
                audience: 'e.g. Digital Marketers, Startup Founders'
            }
        },
        {
            id: 'food', name: 'Food & Beverage', template: 'template_food', icon: '🍔', placeholders: {
                name: 'e.g. Gayo Arabica Coffee Beans',
                description: 'Sourced directly from the highlands of Aceh, our Gayo coffee beans offer a rich, full-bodied chocolate aroma.',
                price: 'e.g. $15.00 / 250gr',
                usp: 'Crafted by expert roasters using traditional slow-roasting techniques.',
                features: 'e.g. Freshly Roasted, Single Origin, High Quality',
                audience: 'e.g. Coffee Lovers, Cafe Owners'
            }
        },
        {
            id: 'fashion', name: 'Fashion & Apparel', template: 'template_fashion', icon: '👕', placeholders: {
                name: 'e.g. Minimalist Linen Shirt',
                description: 'An effortless blend of style and comfort, perfect for warm summer days and evening gatherings.',
                price: 'e.g. $45.00',
                usp: 'Ethically handmade by local artisans using 100% premium organic cotton.',
                features: 'e.g. 100% Organic Linen, Breathable, Eco-friendly',
                audience: 'e.g. Conscious Consumers, Style Enthusiasts'
            }
        },
        {
            id: 'services', name: 'Professional Services', template: 'template_services', icon: '💼', placeholders: {
                name: 'e.g. Business Consulting',
                description: 'Maximize your tax savings and ensure strict legal compliance with our dedicated CPA accounting experts.',
                price: 'e.g. Contact for Quote',
                usp: 'Get your finances handled securely with an iron-clad no-audit guarantee.',
                features: 'e.g. Certified Experts, 100% Compliance, Free Consultation',
                audience: 'e.g. Small Businesses, Freelancers'
            }
        },
    ];

    const templates = [
        { id: 'template_tech', name: 'SaaS / Tech', desc: 'Dark, Neon, Futuristic', preview: 'bg-gray-900 border-purple-500/30' },
        { id: 'template_food', name: 'Appetizing', desc: 'Warm, Orange, Inviting', preview: 'bg-orange-50 border-orange-200' },
        { id: 'template_fashion', name: 'Elegant', desc: 'Minimalist, Serif, Chic', preview: 'bg-[#fafafa] border-gray-200' },
        { id: 'template_services', name: 'Corporate', desc: 'Bold, Blue, Trustworthy', preview: 'bg-blue-600 border-blue-400' },
    ];

    const handleCategorySelect = (cat) => {
        setData({
            ...data,
            category: cat.id,
            template: cat.template
        });
    };

    const inputClasses = "mt-2 block w-full rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none p-3.5";
    const labelClasses = "block text-sm font-semibold text-blue-100/80 tracking-wide";

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-black text-3xl text-white tracking-tight">Forge New Page</h2>
                    <Link
                        href={route('sales-pages.index')}
                        className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                        &larr; Back to Projects
                    </Link>
                </div>
            }
        >
            <Head title="Forge New Page" />
            <AILoadingOverlay isVisible={processing} />

            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <MeshGradient
                    className="absolute inset-0 w-full h-full opacity-30"
                    colors={["#000000", "#3b82f6", "#2563eb", "#1e3a8a", "#06b6d4"]}
                    speed={0.15}
                    backgroundColor="#000000"
                />
            </div>

            <div className="py-8 relative z-10">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <motion.form 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={submit} 
                        className="space-y-10 bg-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 backdrop-blur-2xl"
                    >

                        {/* Category / Industry Selection */}
                        <div>
                            <label className="block text-xl font-bold text-white mb-6">Select Your Industry / Category</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => handleCategorySelect(cat)}
                                        className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-300 ${data.category === cat.id
                                            ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] text-white'
                                            : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5 text-gray-400'
                                            }`}
                                    >
                                        <span className="text-3xl mb-3 drop-shadow-md">{cat.icon}</span>
                                        <span className="text-sm font-bold text-center">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Template Selection */}
                        <div>
                            <label className="block text-xl font-bold text-white mb-6">Choose Design Template</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {templates.map((t) => (
                                    <div
                                        key={t.id}
                                        onClick={() => setData('template', t.id)}
                                        className={`cursor-pointer group relative p-5 rounded-3xl border-2 transition-all duration-300 ${data.template === t.id ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]' : 'border-white/10 bg-black/20 hover:border-white/20'}`}
                                    >
                                        <div className={`w-full h-24 rounded-2xl mb-5 border flex items-center justify-center overflow-hidden ${t.preview}`}>
                                            <div className="w-16 h-2 bg-blue-500/30 rounded-full blur-[1px]"></div>
                                        </div>
                                        <h5 className="font-bold text-white text-lg tracking-tight mb-1">{t.name}</h5>
                                        <p className="text-xs text-gray-400">{t.desc}</p>
                                        {data.template === t.id && (
                                            <div className="absolute top-4 right-4 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                                                <svg className="w-4 h-4 text-black font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
                            <div className="md:col-span-2">
                                <label htmlFor="product_name" className={labelClasses}>Product Name</label>
                                <input
                                    id="product_name"
                                    type="text"
                                    className={inputClasses}
                                    value={data.product_name}
                                    onChange={(e) => setData('product_name', e.target.value)}
                                    required
                                    placeholder={categories.find(c => c.id === data.category)?.placeholders.name}
                                />
                                {errors.product_name && <p className="text-red-400 text-xs mt-2 font-medium">{errors.product_name}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="product_description" className={labelClasses}>Product Description</label>
                                <textarea
                                    id="product_description"
                                    className={`${inputClasses} min-h-[140px] resize-y`}
                                    value={data.product_description}
                                    onChange={(e) => setData('product_description', e.target.value)}
                                    required
                                    placeholder={categories.find(c => c.id === data.category)?.placeholders.description}
                                />
                                {errors.product_description && <p className="text-red-400 text-xs mt-2 font-medium">{errors.product_description}</p>}
                            </div>

                            <div>
                                <label htmlFor="price" className={labelClasses}>Price Display</label>
                                <input
                                    id="price"
                                    type="text"
                                    className={inputClasses}
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                    placeholder={categories.find(c => c.id === data.category)?.placeholders.price}
                                />
                                {errors.price && <p className="text-red-400 text-xs mt-2 font-medium">{errors.price}</p>}
                            </div>

                            <div>
                                <label htmlFor="usp" className={labelClasses}>Unique Selling Point (USP)</label>
                                <input
                                    id="usp"
                                    type="text"
                                    className={inputClasses}
                                    value={data.usp}
                                    onChange={(e) => setData('usp', e.target.value)}
                                    placeholder={categories.find(c => c.id === data.category)?.placeholders.usp}
                                />
                                {errors.usp && <p className="text-red-400 text-xs mt-2 font-medium">{errors.usp}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="features" className={labelClasses}>Key Features (comma separated)</label>
                                <input
                                    id="features"
                                    type="text"
                                    className={inputClasses}
                                    value={data.features}
                                    onChange={(e) => setData('features', e.target.value)}
                                    required
                                    placeholder={categories.find(c => c.id === data.category)?.placeholders.features}
                                />
                                {errors.features && <p className="text-red-400 text-xs mt-2 font-medium">{errors.features}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="target_audience" className={labelClasses}>Target Audience</label>
                                <input
                                    id="target_audience"
                                    type="text"
                                    className={inputClasses}
                                    value={data.target_audience}
                                    onChange={(e) => setData('target_audience', e.target.value)}
                                    required
                                    placeholder={categories.find(c => c.id === data.category)?.placeholders.audience}
                                />
                                {errors.target_audience && <p className="text-red-400 text-xs mt-2 font-medium">{errors.target_audience}</p>}
                            </div>
                        </div>

                        <div className="pt-8">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full flex items-center justify-center py-5 px-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-lg font-black tracking-tight rounded-2xl shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.7)] transition-all duration-300 disabled:opacity-50"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-3">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Forging your page...
                                    </span>
                                ) : 'Generate AI Sales Page'}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
