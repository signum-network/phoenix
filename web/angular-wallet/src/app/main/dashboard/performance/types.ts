export interface FcasRating {
  readonly asset_id: number;
  readonly asset_name: string;
  readonly grade: string;
  readonly has_rank: true;
  readonly metric_slug: string;
  readonly percent_change: number;
  readonly point_change: number;
  readonly symbol: string;
  readonly timestamp: string;
  readonly value: number;
}

