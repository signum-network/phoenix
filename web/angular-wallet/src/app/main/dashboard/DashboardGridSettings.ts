class GridSpans {
  constructor(
    public warning: number,
    public table: number,
    public performance: number,
    public market: number
  ) {
  }
}

export interface DashboardGridAttributes {
  columnCount: number;
  columnSpans: GridSpans;
  rowSpans: GridSpans;
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
      columnSpans: new GridSpans(12,9, 3, 3),
      rowSpans: new GridSpans(2, 21, 9, 10),
      tableColumns: ['transaction_id', 'attachment', 'timestamp', 'type', 'amount', 'fee', 'account'],
    };

    this.lg = {
      columnCount: 12,
      columnSpans: new GridSpans(12, 9, 3, 3),
      rowSpans: new GridSpans(2, 21, 9, 10),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'fee', 'account'],
    };

    this.md = {
      columnCount: 8,
      columnSpans: new GridSpans(8, 5, 3, 3),
      rowSpans: new GridSpans(2, 21, 9, 10),
      tableColumns: ['transaction_id', 'timestamp', 'amount', 'account'],
    };

    this.sm = {
      columnCount: 4,
      columnSpans: new GridSpans(4, 4, 2, 2),
      rowSpans: new GridSpans(2, 21, 9, 10),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'fee', 'account'],
    };

    this.xs = {
      columnCount: 1,
      columnSpans: new GridSpans(1, 1, 1, 1),
      rowSpans: new GridSpans(4, 21, 9, 10),
      tableColumns: ['transaction_id', 'amount'],
    };

  }
}
