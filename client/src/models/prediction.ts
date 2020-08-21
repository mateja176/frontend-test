export interface Prediction {
  featureImportance: FeatureImportance;
  predictions: number[];
  metrics: Metrics;
  modelSummary: ModelSummary;
}

export interface FeatureImportance {
  interestRate: number;
  borrowRate: number;
  marketCap: number;
}

export interface Metrics {
  confusionMetric: ConfusionMetric;
  detailedScoring: DetailedScoring;
  overallScores: OverallScores;
}

export interface ConfusionMetric {
  falsePositive: number;
  truePositive: number;
  falseNegative: number;
  trueNegative: number;
}

export interface DetailedScoring {
  pearsonR: number;
  spearmanRho: number;
  meanAbsError: number;
  medianAbsError: number;
  percentageAbsError: number;
  signMatch: number;
}

export interface OverallScores {
  training: number;
  validation: number;
  testing: number;
}

export interface ModelSummary {
  algo_type: string;
  n_retrain: number;
  n_training_gap: number;
  n_training_warmup: number;
  n_window_size: number;
  scaling: string;
  training_mode: string;
  weight_decay: number;
}
