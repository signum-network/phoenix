import { DescriptorData } from '@signumjs/standards';

export function isTextIsSrc44(text: string): boolean {
  try {
    DescriptorData.parse(text, false);
    return true;
  } catch (e) {
    return false;
  }
}
