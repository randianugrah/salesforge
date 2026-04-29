<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('My Sales Pages') }}
            </h2>
            <a href="{{ route('sales-pages.create') }}" class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                {{ __('Create New') }}
            </a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if(session('success'))
                <div class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    {{ session('success') }}
                </div>
            @endif

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @forelse($salesPages as $page)
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $page->product_name }}</h3>
                            <p class="text-sm text-gray-600 line-clamp-2 mb-4">{{ $page->product_description }}</p>
                            
                            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div class="flex space-x-3">
                                    <a href="{{ route('sales-pages.preview', $page) }}" class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Preview</a>
                                    <a href="{{ route('sales-pages.edit', $page) }}" class="text-gray-600 hover:text-gray-900 text-sm font-medium">Edit</a>
                                </div>
                                <form action="{{ route('sales-pages.destroy', $page) }}" method="POST" onsubmit="return confirm('Delete this page?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-span-full bg-white p-12 text-center rounded-lg shadow-sm">
                        <p class="text-gray-500 mb-4">You haven't generated any sales pages yet.</p>
                        <a href="{{ route('sales-pages.create') }}" class="text-indigo-600 font-bold hover:underline">Get started now &rarr;</a>
                    </div>
                @endforelse
            </div>
        </div>
    </div>
</x-app-layout>
