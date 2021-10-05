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

export interface MinerDashboardLayoutParameters extends LayoutParameters {
  tableColumns: string[];
}

export class MinerDashboardLayoutConfiguration extends LayoutConfiguration<MinerDashboardLayoutParameters> {

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
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 6, 12),
      rowSpans: cs(6, 4, 4, 4, 14),
      tableColumns: ['timestamp', 'type', 'amount', 'account']
    };

    this.sm = {
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 6, 12),
      rowSpans: cs(6, 4, 4, 4, 14),
      tableColumns: ['timestamp', 'type', 'amount', 'account']
    };

    this.xs = {
      columnCount: 12,
      columnSpans: cs(12, 12, 12, 12, 12),
      rowSpans: cs(6, 4, 4, 4, 14),
      tableColumns: ['timestamp', 'amount']
    };

  }
}
