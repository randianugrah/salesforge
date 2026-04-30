<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $salesPage->product_name }} - Sales Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <style>
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Outfit', sans-serif; }
    </style>
</head>
<body>
    @php
        $content = is_string($salesPage->generated_content) ? json_decode($salesPage->generated_content, true) : $salesPage->generated_content;
        $template = $salesPage->template ?? 'template_tech';
    @endphp

    @if($template == 'template_tech')
        <!-- TECH / SAAS TEMPLATE -->
        <div class="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-purple-500/30 relative overflow-hidden">
            <div class="relative z-10">
                <!-- Hero -->
                <header class="relative pt-32 pb-32 overflow-hidden">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full -z-10"></div>
                    <div class="max-w-7xl mx-auto px-6 text-center">
                        <div class="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-bold tracking-widest uppercase mb-8">
                            New Release
                        </div>
                        <h1 class="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white font-heading">
                            {{ $salesPage->headline }}
                        </h1>
                        <p class="max-w-2xl mx-auto text-xl md:text-2xl text-purple-100/70 mb-12 leading-relaxed font-light">
                            {{ $salesPage->sub_headline }}
                        </p>
                        <button class="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl text-xl font-bold shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] mb-20">
                            {{ $content['cta'] ?? 'Get Started Now' }}
                        </button>

                        <div class="relative mx-auto max-w-5xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] bg-black/50 aspect-video flex items-center justify-center">
                            @php
                                $imgPrompt = urlencode(($content['image_prompt'] ?? $salesPage->product_name ?? 'Technology') . ' sleek modern high-tech aesthetic cinematic lighting');
                            @endphp
                            <img src="https://image.pollinations.ai/prompt/{{ $imgPrompt }}?width=1200&height=675&nologo=true" alt="{{ $salesPage->product_name }}" class="w-full h-full object-cover">
                        </div>
                    </div>
                </header>

                <!-- Trust Badges -->
                <div class="py-10 border-y border-white/5 bg-white/5">
                    <div class="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale">
                        <div class="text-xl font-bold tracking-widest text-white">FORBES</div>
                        <div class="text-xl font-bold tracking-widest text-white">WIRED</div>
                        <div class="text-xl font-bold tracking-widest text-white">TECHCRUNCH</div>
                        <div class="text-xl font-bold tracking-widest text-white">FAST COMPANY</div>
                    </div>
                </div>

                <!-- Benefits -->
                @if(isset($content['benefits']))
                <section class="py-32 bg-white/5 backdrop-blur-sm border-y border-white/5">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            @foreach($content['benefits'] as $benefit)
                            <div class="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-purple-500/50 backdrop-blur-md transition-all group hover:bg-white/10">
                                <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30">
                                    <svg class="w-7 h-7 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <p class="text-xl font-bold leading-snug text-white font-heading">{{ $benefit }}</p>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </section>
                @endif

                <!-- Features Breakdown -->
                @if(isset($content['features_breakdown']))
                <section class="py-32">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div class="space-y-12">
                                <h2 class="text-4xl md:text-5xl font-bold tracking-tight font-heading">Crafted for Excellence.</h2>
                                <div class="space-y-10">
                                    @foreach($content['features_breakdown'] as $index => $f)
                                    <div class="flex gap-6">
                                        <div class="shrink-0 w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400 font-heading">{{ $index + 1 }}</div>
                                        <div>
                                            <h3 class="text-xl font-bold mb-2 text-white font-heading">{{ is_array($f) ? $f['title'] : $f }}</h3>
                                            <p class="text-purple-100/60 leading-relaxed font-light">{{ is_array($f) ? $f['detail'] : '' }}</p>
                                        </div>
                                    </div>
                                    @endforeach
                                </div>
                            </div>
                            <div class="relative">
                                <div class="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 blur-[80px] opacity-30"></div>
                                <div class="relative bg-white/5 border border-white/10 p-4 rounded-[3rem] backdrop-blur-xl">
                                    <div class="aspect-square bg-black/50 rounded-[2.5rem] flex items-center justify-center border border-white/5">
                                        <svg class="w-24 h-24 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                @endif

                <!-- Testimonials -->
                <section class="py-32 bg-white/5 border-y border-white/5 backdrop-blur-md relative">
                    <div class="max-w-7xl mx-auto px-6">
                        <h2 class="text-4xl md:text-5xl font-black text-center mb-16 text-white tracking-tight font-heading">Loved by industry leaders.</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            @php
                                $testimonials = $content['testimonials'] ?? [
                                    ['name' => "Sarah Jenkins", 'role' => "CEO at TechFlow", 'content' => "This product completely transformed how we operate. Unbelievable ROI within the first month."],
                                    ['name' => "Marcus Chen", 'role' => "Founder of StartupX", 'content' => "The easiest setup I've ever experienced. Highly recommend this to any growing team."],
                                    ['name' => "Elena Rodriguez", 'role' => "Product Manager", 'content' => "Their support team is unmatched. The features are exactly what we needed to scale."]
                                ];
                            @endphp
                            @foreach($testimonials as $t)
                            <div class="p-8 rounded-[2rem] bg-black/40 border border-white/10">
                                <div class="flex gap-1 mb-6">
                                    @for($i=0; $i<5; $i++)
                                        <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    @endfor
                                </div>
                                <p class="text-purple-100/80 mb-8 text-lg font-light leading-relaxed font-sans">"{{ $t['content'] }}"</p>
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                                        <div class="w-full h-full bg-[#0a0a0a] rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-white font-heading">{{ $t['name'] }}</h4>
                                        <p class="text-sm text-purple-400">{{ $t['role'] }}</p>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </section>

                <!-- Pricing -->
                <section class="py-32">
                    <div class="max-w-4xl mx-auto px-6">
                        <div class="text-center mb-16">
                            <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-heading">Simple, transparent pricing.</h2>
                            <p class="text-xl text-purple-100/60 font-light font-sans">Everything you need to get started.</p>
                        </div>

                        <div class="bg-white/5 border border-purple-500/30 rounded-[3rem] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden">
                            <div class="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full -mr-20 -mt-20"></div>

                            <div class="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                                <div class="w-full md:w-1/2">
                                    <h3 class="text-3xl font-bold text-white mb-2 font-heading">{{ $content['pricing']['name'] ?? 'Pro Plan' }}</h3>
                                    <div class="flex items-end gap-2 mb-8">
                                        <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-heading" style="background: -webkit-linear-gradient(#c084fc, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">{{ $content['pricing']['price'] ?? $salesPage->price ?? '$99' }}</span>
                                        <span class="text-purple-100/60 text-lg mb-2">/{{ $content['pricing']['period'] ?? 'month' }}</span>
                                    </div>

                                    <ul class="space-y-4 mb-10">
                                        @foreach(($content['pricing']['features'] ?? ['Unlimited projects', '24/7 Priority Support', 'Custom domains', 'Advanced Analytics']) as $feature)
                                            <li class="flex items-center gap-3">
                                                <div class="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">✓</div>
                                                <span class="text-purple-100/80">{{ $feature }}</span>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                                <div class="w-full md:w-1/2">
                                    <button class="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl text-xl font-bold shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]">
                                        {{ $content['cta'] ?? 'Get Started Now' }}
                                    </button>
                                    <p class="text-center text-sm text-purple-100/40 mt-4 font-sans">No credit card required. 14-day free trial.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Final CTA -->
                <section class="py-32 relative overflow-hidden border-t border-white/5">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-[120px] rounded-full -z-10"></div>
                    <div class="max-w-5xl mx-auto px-6 text-center">
                        <h2 class="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight font-heading">Ready to boost your sales?</h2>
                        <p class="text-2xl text-purple-100/70 mb-12 font-light max-w-2xl mx-auto font-sans">Join the thousands of users who are already seeing results.</p>
                        <button class="px-12 py-6 bg-white text-[#0a0a0a] rounded-2xl text-2xl font-bold shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] font-heading">
                            {{ $content['cta'] ?? 'Get Started Immediately' }}
                        </button>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="py-12 border-t border-white/10 text-center">
                    <p class="text-purple-100/40 font-sans">© {{ date('Y') }} {{ $salesPage->product_name }}. All rights reserved.</p>
                </footer>
            </div>
        </div>

    @elseif($template == 'template_fashion')
        <!-- FASHION TEMPLATE -->
        <div class="bg-[#fafafa] text-gray-900 font-serif selection:bg-rose-100 min-h-screen">
            <header class="pt-32 pb-32 text-center max-w-4xl mx-auto px-6">
                <h1 class="text-5xl md:text-7xl font-light tracking-tight mb-8">
                    {{ $salesPage->headline }}
                </h1>
                <p class="text-xl text-gray-500 mb-12 font-sans italic">
                    {{ $salesPage->sub_headline }}
                </p>
                <button class="px-12 py-4 bg-gray-900 text-white text-sm font-sans tracking-widest uppercase mb-16">
                    {{ $content['cta'] ?? 'Discover More' }}
                </button>

                <div class="w-full max-w-4xl mx-auto aspect-[4/3] bg-gray-100 mt-10 overflow-hidden shadow-2xl">
                    @php
                        $imgPromptFashion = urlencode(($content['image_prompt'] ?? $salesPage->product_name ?? 'Fashion') . ' minimalist aesthetic fashion editorial high end Vogue style');
                    @endphp
                    <img src="https://image.pollinations.ai/prompt/{{ $imgPromptFashion }}?width=1200&height=900&nologo=true" alt="{{ $salesPage->product_name }}" class="w-full h-full object-cover grayscale-[20%]">
                </div>
            </header>

            @if(isset($content['benefits']))
            <section class="py-24 bg-white border-y border-gray-100">
                <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                    @foreach($content['benefits'] as $benefit)
                    <div class="space-y-6">
                        <div class="w-px h-12 bg-gray-300 mx-auto"></div>
                        <h3 class="text-2xl font-light">{{ $benefit }}</h3>
                    </div>
                    @endforeach
                </div>
            </section>
            @endif

            @if(isset($content['features_breakdown']))
            <section class="py-32 max-w-5xl mx-auto px-6">
                 <div class="space-y-24">
                    @foreach($content['features_breakdown'] as $index => $f)
                    <div class="flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                        <div class="md:w-1/4 font-light text-6xl text-gray-300">0{{ $index + 1 }}</div>
                        <div class="md:w-3/4">
                            <h3 class="text-3xl font-light mb-4">{{ is_array($f) ? $f['title'] : $f }}</h3>
                            <p class="text-gray-500 font-sans text-lg">{{ is_array($f) ? $f['detail'] : '' }}</p>
                        </div>
                    </div>
                    @endforeach
                 </div>
            </section>
            @endif

            <!-- Testimonials -->
            <section class="py-24 bg-gray-50 border-y border-gray-200">
                <div class="max-w-6xl mx-auto px-6">
                    <h2 class="text-4xl font-light text-center mb-16">What They Say</h2>
                    <div class="grid md:grid-cols-3 gap-12">
                        @foreach(($content['testimonials'] ?? []) as $t)
                            <div class="text-center">
                                <p class="font-sans italic text-gray-500 mb-6">"{{ $t['content'] }}"</p>
                                <h4 class="font-bold tracking-widest uppercase text-xs font-sans">{{ $t['name'] }}</h4>
                                <span class="text-xs text-gray-400 font-sans">{{ $t['role'] }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>
            </section>

            <!-- Pricing -->
            @if(isset($content['pricing']))
                <section class="py-32 max-w-4xl mx-auto px-6 text-center">
                    <h2 class="text-4xl font-light mb-16">The Investment</h2>
                    <div class="bg-white border border-gray-200 p-16 shadow-2xl">
                        <h3 class="text-2xl font-light mb-2">{{ $content['pricing']['name'] }}</h3>
                        <div class="text-6xl font-light my-8">{{ $content['pricing']['price'] }}<span class="text-xl text-gray-400 font-sans">/{{ $content['pricing']['period'] }}</span></div>
                        <ul class="space-y-4 mb-12 font-sans text-gray-500">
                            @foreach(($content['pricing']['features'] ?? []) as $f)
                                <li>{{ $f }}</li>
                            @endforeach
                        </ul>
                        <button class="px-12 py-4 bg-gray-900 text-white text-sm font-sans tracking-widest uppercase w-full">
                            {{ $content['cta'] ?? 'Select Plan' }}
                        </button>
                    </div>
                </section>
            @endif

            <footer class="py-12 text-center border-t border-gray-100">
                <p class="text-gray-400 text-xs font-sans uppercase tracking-widest">© {{ date('Y') }} {{ $salesPage->product_name }}</p>
            </footer>
        </div>

    @elseif($template == 'template_services')
        <!-- SERVICES TEMPLATE -->
        <div class="bg-slate-50 text-slate-900 selection:bg-blue-200 font-sans min-h-screen">
            <header class="bg-blue-900 text-white pt-32 pb-48 text-center px-6">
                <div class="max-w-5xl mx-auto">
                    <h1 class="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight font-heading">
                        {{ $salesPage->headline }}
                    </h1>
                    <p class="text-xl text-blue-200 mb-12 max-w-3xl mx-auto font-sans">
                        {{ $salesPage->sub_headline }}
                    </p>
                    <button class="px-10 py-4 bg-blue-500 text-white rounded text-lg font-bold shadow-lg mb-12">
                        {{ $content['cta'] ?? 'Request Consultation' }}
                    </button>

                    <div class="w-full max-w-3xl mx-auto aspect-[21/9] bg-blue-800 rounded-xl mt-10 overflow-hidden shadow-2xl border-4 border-blue-400/20">
                        @php
                            $imgPromptServices = urlencode(($content['image_prompt'] ?? $salesPage->product_name ?? 'Business') . ' professional corporate office environment premium');
                        @endphp
                        <img src="https://image.pollinations.ai/prompt/{{ $imgPromptServices }}?width=1200&height=500&nologo=true" alt="{{ $salesPage->product_name }}" class="w-full h-full object-cover opacity-90 mix-blend-luminosity">
                    </div>
                </div>
            </header>

            @if(isset($content['benefits']))
            <section class="max-w-6xl mx-auto px-6 -mt-24">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    @foreach($content['benefits'] as $benefit)
                    <div class="bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500 flex items-start gap-4">
                        <div class="text-blue-500 mt-1 font-bold">✓</div>
                        <h3 class="text-lg font-bold text-slate-800 font-heading">{{ $benefit }}</h3>
                    </div>
                    @endforeach
                </div>
            </section>
            @endif

            @if(isset($content['features_breakdown']))
            <section class="py-32 max-w-5xl mx-auto px-6">
                <h2 class="text-3xl font-bold text-center mb-16 text-slate-800 font-heading">Why Choose Us</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    @foreach($content['features_breakdown'] as $f)
                    <div class="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                         <h3 class="text-xl font-bold mb-3 text-blue-900 font-heading">{{ is_array($f) ? $f['title'] : $f }}</h3>
                         <p class="text-slate-600 font-sans">{{ is_array($f) ? $f['detail'] : '' }}</p>
                    </div>
                    @endforeach
                </div>
            </section>
            @endif

            <!-- Testimonials -->
            <section class="py-24 bg-blue-900 text-white">
                <div class="max-w-6xl mx-auto px-6">
                    <h2 class="text-3xl font-bold text-center mb-16 font-heading">Client Success Stories</h2>
                    <div class="grid md:grid-cols-3 gap-8">
                        @foreach(($content['testimonials'] ?? []) as $t)
                            <div class="bg-blue-800 p-8 rounded-xl border border-blue-700 shadow-lg">
                                <div class="text-blue-400 mb-4 text-4xl">"</div>
                                <p class="text-blue-100 mb-6 italic font-sans">{{ $t['content'] }}</p>
                                <div>
                                    <h4 class="font-bold font-heading">{{ $t['name'] }}</h4>
                                    <span class="text-sm text-blue-300 font-sans">{{ $t['role'] }}</span>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </section>

            <!-- Pricing -->
            @if(isset($content['pricing']))
                <section class="py-32 max-w-5xl mx-auto px-6">
                    <h2 class="text-3xl font-bold text-center mb-16 text-slate-800 font-heading">Transparent Pricing</h2>
                    <div class="bg-white border-2 border-blue-500 rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
                        <div class="bg-blue-500 p-8 text-center text-white">
                            <h3 class="text-2xl font-bold mb-2 font-heading">{{ $content['pricing']['name'] }}</h3>
                            <div class="text-5xl font-black font-heading">{{ $content['pricing']['price'] }}<span class="text-lg text-blue-200 font-normal">/{{ $content['pricing']['period'] }}</span></div>
                        </div>
                        <div class="p-8">
                            <ul class="space-y-4 mb-8 font-sans">
                                @foreach(($content['pricing']['features'] ?? []) as $f)
                                    <li class="flex items-start gap-3">
                                        <span class="text-blue-500 font-bold">✓</span>
                                        <span class="text-slate-600">{{ $f }}</span>
                                    </li>
                                @endforeach
                            </ul>
                            <button class="w-full py-4 bg-slate-900 text-white rounded-lg font-bold">
                                {{$content['cta'] ?? 'Get Started'}}
                            </button>
                        </div>
                    </div>
                </section>
            @endif

            <footer class="py-12 bg-slate-100 text-center border-t border-slate-200">
                <p class="text-slate-500 font-sans">© {{ date('Y') }} {{ $salesPage->product_name }}</p>
            </footer>
        </div>

    @elseif($template == 'template_food')
        <!-- FOOD TEMPLATE -->
        <div class="bg-[#fffdf7] text-orange-950 font-sans selection:bg-orange-200 min-h-screen">
            <header class="pt-32 pb-32 text-center max-w-4xl mx-auto px-6">
                <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-orange-600 font-heading">
                    {{ $salesPage->headline }}
                </h1>
                <p class="text-xl md:text-2xl text-orange-900/70 mb-10">
                    {{ $salesPage->sub_headline }}
                </p>
                <button class="px-10 py-4 bg-orange-600 text-white rounded-full text-xl font-bold shadow-xl mb-16">
                    {{ $content['cta'] ?? 'Order Now' }}
                </button>

                <div class="w-full max-w-2xl mx-auto aspect-square bg-orange-100 rounded-full mt-8 overflow-hidden shadow-[0_20px_50px_-10px_rgba(234,88,12,0.3)] border-8 border-white">
                    @php
                        $imgPromptFood = urlencode(($content['image_prompt'] ?? $salesPage->product_name ?? 'Food') . ' appetizing food photography bright colors highly detailed menu photo');
                    @endphp
                    <img src="https://image.pollinations.ai/prompt/{{ $imgPromptFood }}?width=800&height=800&nologo=true" alt="{{ $salesPage->product_name }}" class="w-full h-full object-cover">
                </div>
            </header>

            @if(isset($content['benefits']))
            <section class="py-20 bg-orange-50">
                <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    @foreach($content['benefits'] as $benefit)
                    <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-orange-100">
                        <div class="text-4xl mb-4">🍽️</div>
                        <h3 class="text-xl font-bold font-heading">{{ $benefit }}</h3>
                    </div>
                    @endforeach
                </div>
            </section>
            @endif

            @if(isset($content['features_breakdown']))
            <section class="py-32 max-w-5xl mx-auto px-6">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                    @foreach($content['features_breakdown'] as $f)
                    <div class="flex flex-col gap-4">
                        <h3 class="text-2xl font-bold text-orange-600 border-b-2 border-orange-200 pb-2 inline-block w-fit font-heading">{{ is_array($f) ? $f['title'] : $f }}</h3>
                        <p class="text-orange-900/80 text-lg leading-relaxed font-sans">{{ is_array($f) ? $f['detail'] : '' }}</p>
                    </div>
                    @endforeach
                 </div>
            </section>
            @endif

            <!-- Testimonials -->
            <section class="py-24 bg-white border-y border-orange-100">
                <div class="max-w-6xl mx-auto px-6">
                    <h2 class="text-4xl font-black text-center mb-16 text-orange-900 font-heading">What People Are Saying</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        @php
                            $foodTestimonials = $content['testimonials'] ?? [
                                ['name' => "Jessica Alba", 'role' => "Food Blogger", 'content' => "Absolutely delicious! The flavors are incredibly balanced. A must-try."],
                                ['name' => "David Chen", 'role' => "Local Guide", 'content' => "Best experience I've had in a long time. Will definitely come back again."],
                                ['name' => "Maria Garcia", 'role' => "Customer", 'content' => "High quality ingredients and perfect execution. Highly recommended!"]
                            ];
                        @endphp
                        @foreach($foodTestimonials as $t)
                            <div class="bg-orange-50 p-8 rounded-3xl border border-orange-200 text-center shadow-sm">
                                <div class="text-orange-500 text-2xl mb-4">★★★★★</div>
                                <p class="text-orange-900/80 mb-6 italic text-lg leading-relaxed font-sans">"{{ $t['content'] }}"</p>
                                <h4 class="font-bold text-orange-900 text-lg font-heading">{{ $t['name'] }}</h4>
                                <p class="text-sm text-orange-600 font-sans">{{ $t['role'] }}</p>
                            </div>
                        @endforeach
                    </div>
                </div>
            </section>

            <!-- Pricing / Menu -->
            <section class="py-32 max-w-4xl mx-auto px-6 text-center">
                <div class="mb-12">
                    <h2 class="text-4xl md:text-5xl font-black text-orange-900 mb-4 font-heading">Today's Special</h2>
                    <p class="text-xl text-orange-900/60 font-sans">Treat yourself to the best.</p>
                </div>
                <div class="bg-gradient-to-br from-orange-500 to-red-500 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden transform transition-all">
                    <div class="absolute top-0 right-0 text-[15rem] opacity-10 -mt-20 -mr-10 mix-blend-overlay">🔥</div>
                    <h3 class="text-3xl font-bold mb-2 relative z-10 font-heading">{{ $content['pricing']['name'] ?? 'Chef\'s Signature' }}</h3>
                    <div class="text-7xl font-black mb-8 relative z-10 drop-shadow-md font-heading">{{ $content['pricing']['price'] ?? $salesPage->price ?? '$25' }}</div>
                    <ul class="space-y-4 mb-10 text-lg relative z-10 max-w-sm mx-auto font-sans">
                        @foreach(($content['pricing']['features'] ?? ['Fresh Premium Ingredients', 'Free Delivery included', 'Secret Recipe Sauce']) as $feature)
                            <li class="flex items-center justify-center gap-3">
                                <span class="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                                <span>{{ $feature }}</span>
                            </li>
                        @endforeach
                    </ul>
                    <button class="px-12 py-5 bg-white text-orange-600 rounded-full text-xl font-bold shadow-xl relative z-10 w-full md:w-auto">
                        {{ $content['cta'] ?? 'Order Now' }}
                    </button>
                </div>
            </section>

            <footer class="py-12 bg-orange-100 text-center border-t border-orange-200">
                <p class="text-orange-900/40 font-sans">© {{ date('Y') }} {{ $salesPage->product_name }}</p>
            </footer>
        </div>

    @else
        <!-- FALLBACK -->
        <div class="text-center py-20 font-sans">
            <h1 class="text-2xl font-bold">Template Not Found</h1>
            <p>Please regenerate this page in the application.</p>
        </div>
    @endif
</body>
</html>
