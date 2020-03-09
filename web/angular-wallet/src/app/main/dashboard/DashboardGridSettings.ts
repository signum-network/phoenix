class GridColumnSpans {
  constructor(public table: number,
              public performance: number,
              public market: number) {
  }
}

export interface DashboardGridAttributes {
  columnCount: number;
  columnSpans: GridColumnSpans;
  tableColumns: string[];
}

export class DashboardGridSettings {
  public readonly xl: DashboardGridAttributes;
  public readonly lg: DashboardGridAttributes;
  public readonly md: DashboardGridAttributes;
  public readonly sm: DashboardGridAttributes;
  public readonly xs: DashboardGridAttributes;

  constructor() {

    this.xl = {
      columnCount: 12,
      columnSpans: new GridColumnSpans(9, 3, 3),
      tableColumns: ['transaction_id', 'attachment', 'timestamp', 'type', 'amount', 'fee', 'account'],
    };

    this.lg = {
      columnCount: 12,
      columnSpans: new GridColumnSpans(9, 3, 3),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'fee', 'account'],
    };

    this.md = {
      columnCount: 8,
      columnSpans: new GridColumnSpans(5, 3, 3),
      tableColumns: ['transaction_id', 'timestamp', 'amount', 'account'],
    };

    this.sm = {
      columnCount: 4,
      columnSpans: new GridColumnSpans(4, 2, 2),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'fee', 'account'],
    };

    this.xs = {
      columnCount: 1,
      columnSpans: new GridColumnSpans(1, 1, 1),
      tableColumns: ['transaction_id', 'amount'],
    };

  }
}
