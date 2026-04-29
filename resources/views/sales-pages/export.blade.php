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
        h1, h2, h3, .font-heading { font-family: 'Outfit', sans-serif; }
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
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full -z-10"></div>
            
            <header class="relative pt-32 pb-48 text-center px-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white font-heading">
                        {{ $salesPage->headline }}
                    </h1>
                    <p class="max-w-2xl mx-auto text-xl md:text-2xl text-purple-100/70 mb-12 leading-relaxed font-light">
                        {{ $salesPage->sub_headline }}
                    </p>
                    <button class="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-2xl text-xl font-bold shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] transition-all">
                        {{ $content['cta'] ?? 'Get Started Now' }}
                    </button>
                </div>
            </header>

            @if(isset($content['benefits']))
            <section class="py-32 bg-white/5 border-y border-white/5 backdrop-blur-md">
                <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    @foreach($content['benefits'] as $benefit)
                    <div class="p-10 rounded-[2.5rem] bg-white/5 border border-white/10">
                        <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30">
                            <svg class="w-7 h-7 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p class="text-xl font-bold leading-snug text-white font-heading">{{ $benefit }}</p>
                    </div>
                    @endforeach
                </div>
            </section>
            @endif

            @if(isset($content['features_breakdown']))
            <section class="py-32 max-w-7xl mx-auto px-6">
                <div class="space-y-10">
                    @foreach($content['features_breakdown'] as $index => $f)
                    <div class="flex gap-6">
                        <div class="shrink-0 w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400">{{ $index + 1 }}</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2 text-white font-heading">{{ is_array($f) ? $f['title'] : $f }}</h3>
                            <p class="text-purple-100/60 leading-relaxed font-light">{{ is_array($f) ? $f['detail'] : '' }}</p>
                        </div>
                    </div>
                    @endforeach
                </div>
            </section>
            @endif
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
                <button class="px-12 py-4 bg-gray-900 text-white text-sm font-sans tracking-widest uppercase hover:bg-gray-800 transition-all">
                    {{ $content['cta'] ?? 'Discover More' }}
                </button>
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
        </div>

    @elseif($template == 'template_services')
        <!-- SERVICES TEMPLATE -->
        <div class="bg-slate-50 text-slate-900 selection:bg-blue-200 font-sans min-h-screen">
            <header class="bg-blue-900 text-white pt-32 pb-48 text-center px-6">
                <div class="max-w-5xl mx-auto">
                    <h1 class="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight font-heading">
                        {{ $salesPage->headline }}
                    </h1>
                    <p class="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
                        {{ $salesPage->sub_headline }}
                    </p>
                    <button class="px-10 py-4 bg-blue-500 text-white rounded text-lg font-bold shadow-lg hover:bg-blue-400 transition-all">
                        {{ $content['cta'] ?? 'Request Consultation' }}
                    </button>
                </div>
            </header>

            @if(isset($content['benefits']))
            <section class="max-w-6xl mx-auto px-6 -mt-24">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    @foreach($content['benefits'] as $benefit)
                    <div class="bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500 flex items-start gap-4">
                        <div class="text-blue-500 mt-1">✓</div>
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
                         <p class="text-slate-600">{{ is_array($f) ? $f['detail'] : '' }}</p>
                    </div>
                    @endforeach
                </div>
            </section>
            @endif
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
                <button class="px-10 py-4 bg-orange-600 text-white rounded-full text-xl font-bold shadow-xl hover:bg-orange-500 transition-all">
                    {{ $content['cta'] ?? 'Order Now' }}
                </button>
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
                        <p class="text-orange-900/80 text-lg leading-relaxed">{{ is_array($f) ? $f['detail'] : '' }}</p>
                    </div>
                    @endforeach
                 </div>
            </section>
            @endif
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
