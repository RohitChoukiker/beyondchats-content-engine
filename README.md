BeyondChats Content Automation Engine

This repository contains a full-stack content automation system built as part of the BeyondChats assignment.
The system ingests blog content, stores it via a Laravel API, automatically improves articles using Google Search signals and Gemini LLM, and exposes the content via APIs for frontend consumption.

 Project Overview

The project is divided into three phases:

 Phase 1 – Content Ingestion

Scrapes the 5 oldest blogs from BeyondChats.

Stores them in a Laravel-based REST API.

Provides full CRUD APIs for articles.

Phase 2 – Content Improvement Automation

Fetches the latest article from the Laravel API.

Searches Google for top-ranking related articles using SerpAPI.

Scrapes content from the top 2 external articles.

Uses Gemini (Google Generative AI) to improve and restructure the article.

Publishes the improved version back to the Laravel API with references.



Consumes Laravel APIs.

 Architecture Diagram (High Level)
NodeJS Automation Script
│
├── Phase 1: Scrape BeyondChats Blogs
│       └── Laravel API → MySQL
│
└── Phase 2: Improve Latest Article
        ├── Fetch Latest Article (Laravel API)
        ├── Google Search (SerpAPI)
        ├── External Blog Scraping
        ├── Gemini LLM Rewrite
        └── Publish Improved Article (Laravel API)

🛠️ Tech Stack
Backend

Laravel (PHP)

MySQL

REST APIs

Automation / AI

NodeJS

Axios, Cheerio

SerpAPI (Google Search)

Gemini (Google Generative AI SDK)

