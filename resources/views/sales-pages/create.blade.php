<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Create AI Sales Page') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-8">
                    <form action="{{ route('sales-pages.store') }}" method="POST" class="space-y-6">
                        @csrf
                        
                        <div>
                            <x-input-label for="product_name" :value="__('Product/Service Name')" />
                            <x-text-input id="product_name" name="product_name" type="text" class="mt-1 block w-full" required autofocus />
                            <x-input-error class="mt-2" :messages="$errors->get('product_name')" />
                        </div>

                        <div>
                            <x-input-label for="product_description" :value="__('Product Description')" />
                            <textarea id="product_description" name="product_description" rows="4" class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required placeholder="Describe what you offer in detail..."></textarea>
                            <x-input-error class="mt-2" :messages="$errors->get('product_description')" />
                        </div>

                        <div>
                            <x-input-label for="features" :value="__('Key Features (comma-separated)')" />
                            <textarea id="features" name="features" rows="3" class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required placeholder="Fast delivery, 24/7 support, Premium quality..."></textarea>
                            <x-input-error class="mt-2" :messages="$errors->get('features')" />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <x-input-label for="target_audience" :value="__('Target Audience')" />
                                <x-text-input id="target_audience" name="target_audience" type="text" class="mt-1 block w-full" required placeholder="e.g. Small business owners" />
                                <x-input-error class="mt-2" :messages="$errors->get('target_audience')" />
                            </div>
                            <div>
                                <x-input-label for="price" :value="__('Price')" />
                                <x-text-input id="price" name="price" type="text" class="mt-1 block w-full" required placeholder="e.g. $99/month" />
                                <x-input-error class="mt-2" :messages="$errors->get('price')" />
                            </div>
                        </div>

                        <div>
                            <x-input-label for="usp" :value="__('Unique Selling Points (USP)')" />
                            <x-text-input id="usp" name="usp" type="text" class="mt-1 block w-full" placeholder="Why choose you over competitors?" />
                            <x-input-error class="mt-2" :messages="$errors->get('usp')" />
                        </div>

                        <div class="flex items-center gap-4">
                            <x-primary-button class="bg-indigo-600 hover:bg-indigo-700">
                                {{ __('Generate Sales Page') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
