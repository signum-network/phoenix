import { LayoutParameters, LayoutConfiguration } from '../LayoutConfiguration';

const cs = (
  chart: number,
  balance: number,
  market: number,
  token: number,
  table: number
) => ({
  chart,
  balance,
  market,
  token,
  table
});

export interface PowerDashboardLayoutParameters extends LayoutParameters {
  tableColumns: string[];
}

export class PowerDashboardLayoutConfiguration extends LayoutConfiguration<PowerDashboardLayoutParameters> {

  init(): void {

    this.xl = {
      columnCount: 12,
      columnSpans: cs(12, 4, 4, 4, 12),
      rowSpans: cs(6, 4, 4, 4, 14),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account']
    };

    this.lg = {
      columnCount: 12,
      columnSpans: cs(12, 4, 4, 4, 12),
      rowSpans: cs(6, 4, 4, 4, 14),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account']
    };

    this.md = {
      columnCount: 8,
      columnSpans: cs(8, 4, 4, 4, 8),
      rowSpans: cs(6, 4, 4, 4, 14),
      tableColumns: ['timestamp', 'type', 'amount', 'account']
    };

    this.sm = {
      columnCount: 4,
      columnSpans: cs(4, 2, 2, 2, 4),
      rowSpans: cs(6, 4, 4, 4, 14),
      tableColumns: ['timestamp', 'amount', 'account']
    };

    this.xs = {
      columnCount: 1,
      columnSpans: cs(1, 1, 1, 1, 1),
      rowSpans: cs(6, 4, 4, 4, 14),
      tableColumns: ['timestamp', 'amount']
    };

  }
}
