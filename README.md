BeyondChats Content Automation Engine

This repository contains a full-stack content automation system built as part of the BeyondChats engineering assignment.

The system ingests blog content, stores it via a Laravel REST API, automatically improves articles using Google Search signals and a large language model (Gemini), and exposes the content through APIs for frontend consumption.

Project Overview

The project is structured into three clear phases, each solving a specific problem in the content lifecycle.

Phase 1 – Content Ingestion

Objective: Collect and persist source content reliably.

Scrapes the five oldest blog articles from BeyondChats

Extracts article title, content, and source URL

Stores articles in a Laravel-based REST API

Implements full CRUD operations for articles

Phase 2 – Content Improvement Automation

Objective: Automatically enhance article quality using external signals and AI.

Fetches the latest article from the Laravel API

Searches Google for related top-ranking articles using SerpAPI

Scrapes content from the top two external reference articles

Uses Gemini (Google Generative AI) to:

Improve structure and readability

Add missing insights where relevant

Preserve original intent without copying text

Publishes the improved article back to the Laravel API

Appends reference links at the bottom of the improved article


High-Level Architecture
NodeJS Automation Script
│
├── Phase 1: Content Ingestion
│   ├── Scrape BeyondChats Blogs
│   └── Store Articles via Laravel API → MySQL
│
└── Phase 2: Content Improvement
    ├── Fetch Latest Article (Laravel API)
    ├── Google Search (SerpAPI)
    ├── External Blog Scraping
    ├── Gemini LLM Rewrite
    └── Publish Improved Article (Laravel API)

Tech Stack
Backend

Laravel (PHP)

MySQL

RESTful APIs

Automation and AI

NodeJS

Axios

Cheerio

SerpAPI (Google Search)

Gemini (Google Generative AI SDK)
