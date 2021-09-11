import {LayoutConfiguration} from '../LayoutConfiguration';

export class PowerDashboardLayoutConfiguration extends LayoutConfiguration {

  init(): void {

    this.xl = {
      columnCount: 12,
      columnSpans: {
        a: 12,
        b: 9
      },
      rowSpans: {},
    };

    this.lg = {
      columnCount: 12,
      columnSpans: {
        a: 12,
        b: 9
      },
      rowSpans: {},
    };

    this.md = {
      columnCount: 8,
      columnSpans: {
        a: 8,
        b: 4
      },
      rowSpans: {},
    };

    this.sm = {
      columnCount: 4,
      columnSpans: {
        a: 4,
        b: 4
      },
      rowSpans: {},
    };

    this.xs = {
      columnCount: 1,
      columnSpans: {
        a: 1,
        b: 1
      },
      rowSpans: {},
    };

  }
}
