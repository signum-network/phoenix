export enum Sizes {
  SMALL = 4,
  MEDIUM = 8,
  LARGE = 12,
  LARGER = 16
}

export enum BorderRadiusSizes {
  SMALL = Sizes.SMALL / 2,
  MEDIUM = Sizes.MEDIUM / 2,
  LARGE = Sizes.LARGER / 2
}

export enum FontSizes {
  SMALLER = 12,
  SMALL = 16,
  MEDIUM = 20,
  LARGE = 32
}

export const defaultSideOffset = Sizes.MEDIUM;
