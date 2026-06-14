import { NextRequest, NextResponse } from "next/server";
import { getRepoTree } from "@/lib/github";
import { buildGraph } from "@/lib/graph-builder";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Parse owner and repo from URL
    // Standard format: https://github.com/owner/repo
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid GitHub URL. Must be like https://github.com/owner/repo" },
        { status: 400 }
      );
    }

    const owner = match[1];
    const repo = match[2].replace(/\.git$/, ""); // Handle .git suffix

    console.log(`Analyzing repo: ${owner}/${repo}`);

    // 1. Fetch the tree
    const { tree } = await getRepoTree(owner, repo);

    // 2. Build the graph
    const analysis = buildGraph(owner, repo, tree);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Analysis failed:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to analyze repository" },
      { status: 500 }
    );
  }
}
