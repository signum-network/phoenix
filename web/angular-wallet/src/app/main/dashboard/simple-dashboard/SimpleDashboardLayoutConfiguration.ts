import {LayoutParameters, LayoutConfiguration} from '../LayoutConfiguration';

const spans = (warning: number,
               table: number,
               performance: number,
               market: number
) => ({
  warning,
  table,
  performance,
  market
});

export interface SimpleDashboardLayoutParameters extends LayoutParameters {
  tableColumns: string[];
}

export class SimpleDashboardLayoutConfiguration extends LayoutConfiguration<SimpleDashboardLayoutParameters> {

  init(): void {

    this.xl = {
      columnCount: 12,
      columnSpans: spans(12, 9, 3, 3),
      rowSpans: spans(2, 21, 9, 8),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account'],
    };

    this.lg = {
      columnCount: 12,
      columnSpans: spans(12, 9, 3, 3),
      rowSpans: spans(2, 21, 9, 8),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account'],
    };
    this.md = {
      columnCount: 8,
      columnSpans: spans(8, 5, 3, 3),
      rowSpans: spans(2, 21, 9, 8),
      tableColumns: ['transaction_id', 'timestamp', 'amount', 'account'],
    };

    this.sm = {
      columnCount: 4,
      columnSpans: spans(4, 4, 2, 2),
      rowSpans: spans(2, 9, 9, 9),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account'],
    };

    this.xs = {
      columnCount: 1,
      columnSpans: spans(1, 1, 1, 1),
      rowSpans: spans(4, 8, 8, 8),
      tableColumns: ['transaction_id', 'amount'],
    };

  }
}
