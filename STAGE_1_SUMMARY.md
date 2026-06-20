# RepoBrain — Stage 1: Foundation & Landing Page

This document summarizes the changes made during Stage 1 of the RepoBrain project.

## Overview
Stage 1 focuses on building the core infrastructure and the initial user experience. The goal is to allow users to input a GitHub URL and receive a high-level breakdown of the repository's architectural modules.

## Key Components

### 1. GitHub API Integration (`lib/github.ts`)
- **Octokit Wrapper**: Uses the official GitHub SDK to interact with the GitHub API.
- **Recursive Tree Fetching**: Uses the `getTree` API with `recursive: true` to fetch the entire repository structure in a single request. This is optimized for performance and lower API overhead.
- **Repo Info & Issues**: Provides helper functions to fetch repository metadata (stars, language) and open issues.

### 2. Graph Builder Logic (`lib/graph-builder.ts`)
- **Module Identification**: Implementation of a heuristic to group flat file paths into "modules". It currently identifies top-level directories as architectural modules.
- **Node & Edge Generation**: Transforms the file tree into a graph structure where:
  - **Module Nodes**: Represent directories/components.
  - **File Nodes**: Represent individual files.
  - **Contains Edges**: Define the hierarchy (which module contains which file).

### 3. Analysis API (`app/api/analyze/route.ts`)
- **Endpoint**: `POST /api/analyze`
- **Validation**: Parses GitHub URLs to extract owner and repository names.
- **Processing**: Orchestrates the fetching of the tree and the building of the graph, returning a clean JSON response for the frontend.

### 4. Premium Landing Page (`app/page.tsx`)
- **Aesthetic**: A modern, dark-themed design with smooth gradients, glassmorphism, and Framer Motion animations.
- **Interactive URL Input**: A glowing input field that handles GitHub URL parsing and redirects the user to the analysis view.
- **Feature Showcase**: Highlights the core value propositions: Interactive Graph, Issue Mapping, and AI Assistant.

### 5. Analysis Shell (`app/analyze/[owner]/[repo]/page.tsx`)
- **Dynamic Routing**: Handles repository-specific views using Next.js App Router params.
- **Loading UI**: A dedicated loading state with animated spinners to keep the user engaged during the analysis process.
- **Module Grid**: For Stage 1, it displays the detected modules in a clean grid, providing immediate feedback that the analysis is working.

## Database & Setup
- **Prisma Schema**: Defined models for `Repository`, `Module`, `RepoFile`, and `Issue` to support future persistence and AI enrichment.
- **Global Styles**: Updated `globals.css` with custom theme colors and animations for the "premium" feel.

## How to Run
1. Ensure `GITHUB_TOKEN` is set in your `.env.local`.
2. Run `npm run dev`.
3. Paste a GitHub URL on the landing page and click "Analyze".

---
*Next Step: Stage 2 — Interactive Graph Engine (React Flow Implementation)*
