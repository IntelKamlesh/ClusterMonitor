export interface Deployment {
  id: string;
  name: string;
  namespace: string;
  replicas: number;
  availableReplicas: number;
  readyReplicas: number;
  updatedReplicas: number;
  strategy: 'RollingUpdate' | 'Recreate';
  minReadySeconds?: number;
  revisionHistoryLimit?: number;
  creationTimestamp: string;
  lastUpdateTimestamp?: string;
  status: 'Progressing' | 'Complete' | 'Failed';
  conditions?: DeploymentCondition[];
  selector?: { [key: string]: string };
  labels?: { [key: string]: string };
  annotations?: { [key: string]: string };
  containers?: Container[];
}

export interface DeploymentCondition {
  type: string;
  status: 'True' | 'False' | 'Unknown';
  lastUpdateTime: string;
  lastTransitionTime: string;
  reason: string;
  message: string;
}

export interface Container {
  name: string;
  image: string;
  resources?: {
    limits?: { [key: string]: string };
    requests?: { [key: string]: string };
  };
  ports?: {
    containerPort: number;
    protocol: string;
  }[];
}
