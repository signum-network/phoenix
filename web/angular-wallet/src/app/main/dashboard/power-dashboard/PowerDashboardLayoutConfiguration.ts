import {LayoutParameters, LayoutConfiguration} from '../LayoutConfiguration';

const cs = (
  chart: number,
  balance: number,
  market: number,
  table: number,
) => ({
  chart,
  balance,
  market,
  table,
});

export interface PowerDashboardLayoutParameters extends LayoutParameters {
  tableColumns: string[];
}

export class PowerDashboardLayoutConfiguration extends LayoutConfiguration<PowerDashboardLayoutParameters> {

  init(): void {

    this.xl = {
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 12),
      rowSpans: cs(6, 3, 2, 20),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account'],
    };

    this.lg = {
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 12),
      rowSpans: cs(6, 3, 2, 20),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account'],
    };

    this.md = {
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 12),
      rowSpans: cs(6, 3, 2, 20),
      tableColumns: ['timestamp', 'type', 'amount', 'account'],
    };

    this.sm = {
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 12),
      rowSpans: cs(6, 3, 2, 20),
      tableColumns: ['timestamp', 'type', 'amount', 'account'],
    };

    this.xs = {
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 12),
      rowSpans: cs(6, 3, 2, 20),
      tableColumns: ['timestamp', 'amount', 'account'],
    };

  }
}
