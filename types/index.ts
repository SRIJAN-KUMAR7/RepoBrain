// Graph node types
export interface RepoNode {
  id: string;
  type: 'module' | 'file';
  label: string;
  path: string;
  language?: string;
  fileCount?: number;    // for modules
  issueCount?: number;   // for modules
  imports?: string[];    // for files
}

// Graph edge types
export interface RepoEdge {
  id: string;
  source: string;
  target: string;
  type: 'contains' | 'depends_on';
}

// Analysis result
export interface AnalysisResult {
  owner: string;
  repo: string;
  nodes: RepoNode[];
  edges: RepoEdge[];
  fileCount: number;
  moduleCount: number;
}

// GitHub issue with AI predictions (for future stages but defined now)
export interface MappedIssue {
  number: number;
  title: string;
  body: string | null;
  labels: string[];
  state: string;
  predictedFiles?: { path: string; confidence: number }[];
}
