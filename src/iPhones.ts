export interface iPhone {
  width: number;
  height: number;
  leftMargin: number;
  topMargin: number;
  iconSize: number;
  iconRightMargin: number;
  iconBottomMargin: number;
}

export default {
  "iPhone 6s": {
    width: 750,
    height: 1334,
    leftMargin: 54,
    topMargin: 60,
    iconSize: 120,
    iconRightMargin: 54,
    iconBottomMargin: 56,
  },
  "iPhone 7": {
    width: 750,
    height: 1334,
    leftMargin: 54,
    topMargin: 60,
    iconSize: 120,
    iconRightMargin: 54,
    iconBottomMargin: 56,
  },
  "iPhone 7s": {
    width: 1242,
    height: 2208,
    leftMargin: 99,
    topMargin: 114,
    iconSize: 180,
    iconRightMargin: 104,
    iconBottomMargin: 111,
  },
  "iPhone 8": {
    width: 750,
    height: 1334,
    leftMargin: 54,
    topMargin: 60,
    iconSize: 120,
    iconRightMargin: 54,
    iconBottomMargin: 56,
  },
  "iPhone 8s": {
    width: 1242,
    height: 2208,
    leftMargin: 99,
    topMargin: 113,
    iconSize: 180,
    iconRightMargin: 104,
    iconBottomMargin: 111,
  },
} as { [key: string]: iPhone };
