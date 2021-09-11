export interface LayoutGridSpans {
  [keys: string]: number;
}

export interface LayoutAttributes {
  columnCount: number;
  columnSpans: LayoutGridSpans;
  rowSpans: LayoutGridSpans;
}

export abstract class LayoutConfiguration {
  public xl: LayoutAttributes;
  public lg: LayoutAttributes;
  public md: LayoutAttributes;
  public sm: LayoutAttributes;
  public xs: LayoutAttributes;

  constructor() {
    this.init();
  }

  // init the layout attributes here
  abstract init(): void;
}
