# BeyondChats Content Automation Engine

This repository contains a **full-stack content automation system** built as part of the **BeyondChats engineering assignment**.

The system ingests blog content, stores it via a Laravel REST API, automatically improves articles using Google Search signals and a large language model (Gemini), and exposes the content through APIs for frontend consumption.

---

## Project Overview

The project is structured into **three clear phases**, each solving a specific problem in the content lifecycle.

---

## Phase 1 – Content Ingestion

**Objective:** Collect and persist source content reliably.

- Scrapes the five oldest blog articles from BeyondChats  
- Extracts article title, content, and source URL  
- Stores articles in a Laravel-based REST API  
- Implements full CRUD operations for articles  

---

## Phase 2 – Content Improvement Automation

**Objective:** Automatically enhance article quality using external signals and AI.

- Fetches the latest article from the Laravel API  
- Searches Google for related top-ranking articles using **SerpAPI**  
- Scrapes content from the top two external reference articles  
- Uses **Gemini (Google Generative AI)** to:
  - Improve structure and readability  
  - Add missing insights where relevant  
  - Preserve original intent without copying text  
- Publishes the improved article back to the Laravel API  
- Appends reference links at the bottom of the improved article  

---



## High-Level Architecture


---

## Tech Stack

### Backend
- Laravel (PHP)
- MySQL
- RESTful APIs

### Automation and AI
- NodeJS
- Axios
- Cheerio
- SerpAPI (Google Search)
- Gemini (Google Generative AI SDK)
---

## Key Design Decisions

- SerpAPI is used instead of scraping Google directly to ensure reliability and compliance.  
- Clear separation between ingestion and improvement phases to keep responsibilities isolated.  
- Gemini SDK is preferred over raw REST calls to avoid model and version instability.  
- Automation is designed to be repeatable and hands-free once configured.  

---

## Summary

This project demonstrates a complete content automation pipeline — from scraping and storage to AI-driven content improvement — built with real-world engineering constraints and deployed on a live Laravel backend.


