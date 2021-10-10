import { LayoutParameters, LayoutConfiguration } from '../LayoutConfiguration';

const spans = (
  chart: number,
  table: number,
  warning: number
) => ({
  chart,
  table,
  warning
});

export interface SimpleDashboardLayoutParameters extends LayoutParameters {
  tableColumns: string[];
}

export class SimpleDashboardLayoutConfiguration extends LayoutConfiguration<SimpleDashboardLayoutParameters> {

  init(): void {

    this.xl = {
      columnCount: 12,
      columnSpans: spans(12, 12, 12),
      rowSpans: spans(5, 14, 2),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account']
    };

    this.lg = {
      columnCount: 12,
      columnSpans: spans(12, 12, 12),
      rowSpans: spans(5, 14, 2),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account']
    };
    this.md = {
      columnCount: 8,
      columnSpans: spans(8, 8, 8),
      rowSpans: spans(5, 14, 2),
      tableColumns: ['timestamp', 'type', 'amount', 'account']
    };

    this.sm = {
      columnCount: 4,
      columnSpans: spans(4, 4, 4),
      rowSpans: spans(5, 14, 2),
      tableColumns: ['timestamp', 'amount', 'account']
    };

    this.xs = {
      columnCount: 1,
      columnSpans: spans(1, 1, 1),
      rowSpans: spans(5, 14, 8),
      tableColumns: ['timestamp', 'amount']
    };

  }
}
