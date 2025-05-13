export interface Project {
  id: string;
  name: string;
  description: string;
  namespace: string;
  creationTimestamp: string;
  status: 'Active' | 'Terminating' | 'Inactive';
  resourceQuota?: {
    cpu: {
      limit: string;
      used: string;
    };
    memory: {
      limit: string;
      used: string;
    };
    storage?: {
      limit: string;
      used: string;
    };
    pods?: {
      limit: number;
      used: number;
    }
  };
  deploymentCount?: number;
  podCount?: number;
  owner?: string;
  labels?: { [key: string]: string };
}
