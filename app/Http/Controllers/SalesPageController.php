<?php

namespace App\Http\Controllers;

use App\Models\SalesPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SalesPageController extends Controller
{
    public function index()
    {
        $salesPages = auth()->user()->salesPages()->latest()->get();
        return Inertia::render('SalesPages/Index', [
            'salesPages' => $salesPages,
            'status' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('SalesPages/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string',
            'features' => 'required|string',
            'target_audience' => 'required|string',
            'price' => 'required|string',
            'usp' => 'nullable|string',
            'template' => 'nullable|string',
        ]);

        $salesPage = auth()->user()->salesPages()->create([
            ...$validated,
            'slug' => Str::slug($validated['product_name']) . '-' . Str::random(5),
        ]);

        $this->generateAiContent($salesPage);

        return redirect()->route('sales-pages.preview', $salesPage)
            ->with('success', 'Sales page generated successfully!');
    }

    public function show(SalesPage $salesPage)
    {
        return Inertia::render('SalesPages/Preview', [
            'salesPage' => $salesPage,
            'status' => session('success'),
        ]);
    }

    public function edit(SalesPage $salesPage)
    {
        return Inertia::render('SalesPages/Edit', [
            'salesPage' => $salesPage
        ]);
    }

    public function update(Request $request, SalesPage $salesPage)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string',
            'features' => 'required|string',
            'target_audience' => 'required|string',
            'price' => 'required|string',
            'usp' => 'nullable|string',
            'template' => 'nullable|string',
        ]);

        $salesPage->update($validated);

        // Re-generate AI content
        $this->generateAiContent($salesPage);

        return redirect()->route('sales-pages.preview', $salesPage)
            ->with('success', 'Sales page updated and re-generated!');
    }

    public function destroy(SalesPage $salesPage)
    {
        $salesPage->delete();
        return redirect()->route('sales-pages.index')->with('success', 'Page deleted.');
    }

    public function export(SalesPage $salesPage)
    {
        $html = view('sales-pages.export', compact('salesPage'))->render();
        
        return response($html)
            ->header('Content-Type', 'text/html')
            ->header('Content-Disposition', 'attachment; filename="' . $salesPage->slug . '.html"');
    }

    private function generateAiContent(SalesPage $salesPage)
    {
        $apiKey = config('services.gemini.key');
        $baseUrl = env('GEMINI_BASE_URL', 'https://generativelanguage.googleapis.com/v1beta');
        
        $prompt = "You are an expert sales copywriter. Generate a high-converting sales page for the following product:
        Name: {$salesPage->product_name}
        Description: {$salesPage->product_description}
        Features: {$salesPage->features}
        Target Audience: {$salesPage->target_audience}
        Price: {$salesPage->price}
        USP: {$salesPage->usp}

        Please provide the output in JSON format with the following structure:
        {
          \"headline\": \"...\",
          \"sub_headline\": \"...\",
          \"description\": \"...\",
          \"image_prompt\": \"A highly detailed, aesthetic image description for an AI generator representing the product (e.g. 'A sleek modern smart watch on a neon desk, cinematic lighting, 8k'). Purely descriptive.\",
          \"benefits\": [\"...\", \"...\", \"...\"],
          \"features_breakdown\": [{\"title\": \"...\", \"detail\": \"...\"}],
          \"testimonials\": [{\"name\": \"...\", \"role\": \"...\", \"content\": \"...\"}],
          \"pricing\": {\"name\": \"...\", \"price\": \"...\", \"period\": \"...\", \"features\": [\"...\", \"...\"]},
          \"cta\": \"...\"
        }";

        try {
            // Check if we are using LiteLLM/OpenAI format or Google format
            if (str_starts_with($apiKey, 'sk-')) {
                $response = Http::withToken($apiKey)->post("{$baseUrl}/chat/completions", [
                    'model' => 'vertex_ai/gemini-2.0-flash-lite',
                    'messages' => [
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'response_format' => ['type' => 'json_object']
                ]);
            } else {
                $response = Http::post("{$baseUrl}/models/gemini-1.5-flash:generateContent?key={$apiKey}", [
                    'contents' => [['parts' => [['text' => $prompt]]]],
                    'generationConfig' => ['response_mime_type' => 'application/json']
                ]);
            }
                
            if ($response->successful()) {
                $data = $response->json();
                $contentRaw = str_starts_with($apiKey, 'sk-') 
                    ? $data['choices'][0]['message']['content'] 
                    : $data['candidates'][0]['content']['parts'][0]['text'];
                
                $content = json_decode($contentRaw, true);

                if (isset($content)) {
                    $salesPage->update([
                        'headline' => $content['headline'] ?? 'Headline Generated',
                        'sub_headline' => $content['sub_headline'] ?? '',
                        'generated_content' => $content,
                    ]);
                } else {
                    \Log::error('AI JSON Decode Failed: ' . $contentRaw);
                }
            } else {
                \Log::error('AI API Failure Status: ' . $response->status());
                \Log::error('AI API Failure Body: ' . $response->body());
            }
        } catch (\Exception $e) {
            \Log::error('Generation Exception: ' . $e->getMessage());
        }
    }
}
