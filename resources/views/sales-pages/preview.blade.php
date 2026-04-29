<x-app-layout>
    @if(auth()->id() === $salesPage->user_id)
    <div class="bg-indigo-50 border-b border-indigo-100 py-3">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
            <div class="text-sm text-indigo-700">
                <span class="font-bold">Owner View:</span> You can edit or regenerate this page.
            </div>
            <div class="flex gap-4">
                <a href="{{ route('sales-pages.edit', $salesPage) }}" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Edit Data</a>
                <form action="{{ route('sales-pages.update', $salesPage) }}" method="POST">
                    @csrf
                    @method('PUT')
                    {{-- Hidden fields to preserve data during quick regenerate --}}
                    <input type="hidden" name="product_name" value="{{ $salesPage->product_name }}">
                    <input type="hidden" name="product_description" value="{{ $salesPage->product_description }}">
                    <input type="hidden" name="features" value="{{ $salesPage->features }}">
                    <input type="hidden" name="target_audience" value="{{ $salesPage->target_audience }}">
                    <input type="hidden" name="price" value="{{ $salesPage->price }}">
                    <input type="hidden" name="usp" value="{{ $salesPage->usp }}">
                    <button type="submit" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Quick Regenerate</button>
                </form>
            </div>
        </div>
    </div>
    @endif

    <div class="bg-white">
        <!-- Hero Section -->
        <header class="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
                        {{ $salesPage->headline ?? 'Generating your headline...' }}
                    </h1>
                    <p class="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
                        {{ $salesPage->sub_headline ?? 'We are crafting the perfect sub-headline for your product.' }}
                    </p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#" class="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
                            {{ $salesPage->generated_content['cta'] ?? 'Get Started' }}
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Benefits Section -->
        @if(isset($salesPage->generated_content['benefits']))
        <section class="py-24 bg-gray-50">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="mx-auto max-w-2xl text-center mb-16">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose {{ $salesPage->product_name }}?</h2>
                </div>
                <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    @foreach($salesPage->generated_content['benefits'] as $benefit)
                    <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div class="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                            <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <p class="text-lg font-medium text-gray-900">{{ $benefit }}</p>
                    </div>
                    @endforeach
                </div>
            </div>
        </section>
        @endif

        <!-- Features Breakdown -->
        @if(isset($salesPage->generated_content['features_breakdown']))
        <section class="py-24">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Everything you need to succeed</h2>
                        <dl class="space-y-8">
                            @foreach($salesPage->generated_content['features_breakdown'] as $feature)
                            <div>
                                <dt class="text-xl font-bold text-gray-900 mb-2">{{ $feature['title'] }}</dt>
                                <dd class="text-gray-600">{{ $feature['detail'] }}</dd>
                            </div>
                            @endforeach
                        </dl>
                    </div>
                    <div class="bg-indigo-600 rounded-3xl aspect-square flex items-center justify-center">
                         <span class="text-white text-9xl font-bold opacity-10">AI</span>
                    </div>
                </div>
            </div>
        </section>
        @endif

        <!-- Social Proof Section -->
        <section class="py-24 bg-white">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="mx-auto max-w-2xl text-center mb-16">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900">What our customers say</h2>
                </div>
                <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                    @for($i = 1; $i <= 3; $i++)
                    <div class="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                        <div class="flex items-center gap-x-1 text-yellow-400 mb-4">
                            @for($j = 0; $j < 5; $j++)
                            <svg class="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            @endfor
                        </div>
                        <p class="text-gray-600 italic mb-6">"{{ $salesPage->generated_content['social_proof_placeholder'] ?? 'This product has completely transformed the way we handle our business processes. Highly recommended!' }}"</p>
                        <div class="flex items-center gap-x-4">
                            <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">U{{ $i }}</div>
                            <div>
                                <div class="text-sm font-semibold text-gray-900">Happy User {{ $i }}</div>
                                <div class="text-xs text-gray-500">CEO, Company {{ $i }}</div>
                            </div>
                        </div>
                    </div>
                    @endfor
                </div>
            </div>
        </section>

        <!-- Pricing Section -->
        <section class="py-24 bg-gray-900 text-white rounded-t-[3rem]">
            <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p class="text-gray-400 mb-12">Start today and transform your business.</p>
                <div class="inline-block bg-white/10 backdrop-blur-md p-12 rounded-3xl border border-white/20">
                    <p class="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-4">Standard Plan</p>
                    <p class="text-5xl font-bold mb-8">{{ $salesPage->price }}</p>
                    <ul class="text-left space-y-4 mb-10">
                        <li class="flex items-center gap-3">
                            <svg class="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                            Full Access to Features
                        </li>
                        <li class="flex items-center gap-3">
                            <svg class="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                            24/7 Support
                        </li>
                    </ul>
                    <a href="#" class="block w-full rounded-full bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-sm hover:bg-gray-100 transition-all">
                        Get Started Now
                    </a>
                </div>
            </div>
        </section>
    </div>
</x-app-layout>
