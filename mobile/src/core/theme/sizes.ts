export enum SizeNames {
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  sm = 'sm',
  m = 'm',
  ml = 'ml',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl'
}

export enum ESizes {
  xxs = 1,
  xs = 2,
  s = 4,
  sm = 6,
  m = 8,
  ml = 12,
  l = 16,
  xl = 20,
  xxl = 24
}

export enum ESpaces {
  xxs = 2,
  xs = 4,
  s = 8,
  sm = 12,
  m = 16,
  ml = 24,
  l = 32,
  xl = 40,
  xxl = 48
}

export enum BorderRadiusSizes {
  xxs = 1,
  xs = 1,
  s = 2,
  sm = 2,
  m = 4,
  ml = 4,
  l = 8,
  xl = 12,
  xxl = 16
}

export enum FontSizes {
  xxs = 2,
  xs = 4,
  s = 8,
  sm = 12,
  m = 16,
  ml = 24,
  l = 32,
  xl = 40,
  xxl = 48
}

export interface ThemeSizes {
  buttonInnerPadding: ESizes;
  buttonOuterPadding: ESizes;
  borderRadius: BorderRadiusSizes;
  fontSize: FontSizes;
}

export interface Sizes {
  [SizeNames.xxs]: ThemeSizes;
  [SizeNames.xs]: ThemeSizes;
  [SizeNames.s]: ThemeSizes;
  [SizeNames.sm]: ThemeSizes;
  [SizeNames.m]: ThemeSizes;
  [SizeNames.ml]: ThemeSizes;
  [SizeNames.l]: ThemeSizes;
  [SizeNames.xl]: ThemeSizes;
  [SizeNames.xxl]: ThemeSizes;
}

export const themeSizes: Sizes = {
  [SizeNames.xxs]: {
    buttonInnerPadding: ESizes.xxs,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.xxs,
    fontSize: FontSizes.xxs
  },
  [SizeNames.xs]: {
    buttonInnerPadding: ESizes.xs,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.xs,
    fontSize: FontSizes.xs
  },
  [SizeNames.s]: {
    buttonInnerPadding: ESizes.s,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.s,
    fontSize: FontSizes.s
  },
  [SizeNames.sm]: {
    buttonInnerPadding: ESizes.sm,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.sm,
    fontSize: FontSizes.sm
  },
  [SizeNames.m]: {
    buttonInnerPadding: ESizes.m,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.m,
    fontSize: FontSizes.m
  },
  [SizeNames.ml]: {
    buttonInnerPadding: ESizes.ml,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.ml,
    fontSize: FontSizes.ml
  },
  [SizeNames.l]: {
    buttonInnerPadding: ESizes.l,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.l,
    fontSize: FontSizes.l
  },
  [SizeNames.xl]: {
    buttonInnerPadding: ESizes.xl,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.xl,
    fontSize: FontSizes.xl
  },
  [SizeNames.xxl]: {
    buttonInnerPadding: ESizes.xxl,
    buttonOuterPadding: ESizes.m,
    borderRadius: BorderRadiusSizes.xxl,
    fontSize: FontSizes.xxl
  }
};

export const defaultSideOffset = ESizes.m;
