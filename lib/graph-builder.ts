import { RepoNode, RepoEdge, AnalysisResult } from "@/types";
import { RepoTreeItem } from "./github";

/**
 * Builds a module-based graph from a flat list of repository files.
 */
export function buildGraph(
  owner: string,
  repo: string,
  tree: RepoTreeItem[]
): AnalysisResult {
  const nodes: RepoNode[] = [];
  const edges: RepoEdge[] = [];
  const moduleMap = new Map<string, { path: string; fileCount: number }>();

  // 1. Identify modules (Top-level directories or key folders)
  tree.forEach((item) => {
    if (item.type === "blob") {
      const parts = item.path.split("/");
      let moduleName = "Root";
      let modulePath = "";

      if (parts.length > 1) {
        // If it's in a directory, use the first part as the module
        // Special case: if it starts with 'src/', use the second part
        if (parts[0] === "src" && parts.length > 2) {
          moduleName = parts[1];
          modulePath = `src/${parts[1]}/`;
        } else {
          moduleName = parts[0];
          modulePath = `${parts[0]}/`;
        }
      }

      const existing = moduleMap.get(moduleName) || {
        path: modulePath,
        fileCount: 0,
      };
      existing.fileCount += 1;
      moduleMap.set(moduleName, existing);

      // Add file node
      nodes.push({
        id: `file:${item.path}`,
        type: "file",
        label: parts[parts.length - 1],
        path: item.path,
        language: getLanguageFromPath(item.path),
      });
    }
  });

  // 2. Add module nodes and connect files to modules
  moduleMap.forEach((info, name) => {
    const moduleId = `module:${name}`;
    nodes.push({
      id: moduleId,
      type: "module",
      label: name,
      path: info.path,
      fileCount: info.fileCount,
    });

    // Connect files belonging to this module
    nodes.forEach((node) => {
      if (node.type === "file") {
        const isChild =
          info.path === ""
            ? !node.path.includes("/")
            : node.path.startsWith(info.path);

        if (isChild) {
          edges.push({
            id: `edge:${moduleId}->${node.id}`,
            source: moduleId,
            target: node.id,
            type: "contains",
          });
        }
      }
    });
  });

  return {
    owner,
    repo,
    nodes,
    edges,
    fileCount: tree.filter((t) => t.type === "blob").length,
    moduleCount: moduleMap.size,
  };
}

function getLanguageFromPath(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "tsx":
      return "typescript";
    case "js":
    case "jsx":
      return "javascript";
    case "py":
      return "python";
    case "go":
      return "go";
    case "rs":
      return "rust";
    case "md":
      return "markdown";
    default:
      return "plaintext";
  }
}
