<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //  GET /api/articles
     
    public function index()
    {
        return response()->json([
            'message' => 'hello rohit'
        ], 200);
    }

    //  GET /api/articles/{id}
   
    public function show($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ], 200);
    }

    
    //   POST /api/articles
     
    public function store(Request $request)
    {
      
        $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article = Article::create([
            'title'      => $request->title,
            'content'    => $request->content,
            'source_url' => $request->source_url ?? null,
            'is_updated' => false
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully',
            'data' => $article
        ], 201);
    }

//    PUT /api/articles/{id}
    
    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $request->validate([
            'title'   => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $article->update([
            'title'      => $request->title ?? $article->title,
            'content'    => $request->content ?? $article->content,
            'source_url' => $request->source_url ?? $article->source_url,
            'is_updated' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Article updated successfully',
            'data' => $article
        ], 200);
    }

    //  DELETE /api/articles/{id}
    
    public function destroy($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully'
        ], 200);
    }

//    GET /api/articles/latest
   
    public function latest()
    {
        $article = Article::orderBy('created_at', 'desc')->first();

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'No articles found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ], 200);
    }
}
