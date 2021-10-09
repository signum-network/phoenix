import { LayoutParameters, LayoutConfiguration } from '../LayoutConfiguration';

const cs = (
  chart: number,
  balance: number,
  info: number,
  blockInfo: number,
  forgedBlocks: number,
  pool: number,
  table: number
) => ({
  chart,
  balance,
  info,
  blockInfo,
  forgedBlocks,
  pool,
  table
});

export interface MinerDashboardLayoutParameters extends LayoutParameters {
  tableColumns: string[];
}

export class MinerDashboardLayoutConfiguration extends LayoutConfiguration<MinerDashboardLayoutParameters> {

  init(): void {

    this.xl = {
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 4, 4, 4, 12),
      rowSpans: cs(6, 4, 4, 3, 3, 3, 14),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account']
    };

    this.lg = {
      columnCount: 12,
      columnSpans: cs(12, 6, 6, 4, 4, 4, 12),
      rowSpans: cs(6, 4, 4, 3, 3, 3, 14),
      tableColumns: ['transaction_id', 'timestamp', 'type', 'amount', 'account']
    };

    this.md = {
      columnCount: 8,
      columnSpans: cs(8, 4, 4, 2, 2, 2, 8),
      rowSpans: cs(6, 4, 4, 3, 3, 3, 14),
      tableColumns: ['timestamp', 'type', 'amount', 'account']
    };

    this.sm = {
      columnCount: 4,
      columnSpans: cs(4, 4, 4, 2, 2, 2, 4),
      rowSpans: cs(6, 4, 4, 3, 3, 3, 14),
      tableColumns: ['timestamp', 'type', 'amount', 'account']
    };

    this.xs = {
      columnCount: 1,
      columnSpans: cs(1, 1, 1, 1, 1, 1, 1),
      rowSpans: cs(6, 4, 4, 3, 3, 3, 14),
      tableColumns: ['timestamp', 'amount']
    };

  }
}
