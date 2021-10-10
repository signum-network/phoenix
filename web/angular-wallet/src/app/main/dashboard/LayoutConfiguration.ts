export interface LayoutGridSpans {
  [keys: string]: number;
}

export interface LayoutParameters {
  columnCount: number;
  columnSpans: LayoutGridSpans;
  rowSpans: LayoutGridSpans;
}

export abstract class LayoutConfiguration<PARAM = LayoutParameters> {
  public xl: PARAM;
  public lg: PARAM;
  public md: PARAM;
  public sm: PARAM;
  public xs: PARAM;

  constructor() {
    this.init();
  }

  // init the layout parameters here
  abstract init(): void;
}
