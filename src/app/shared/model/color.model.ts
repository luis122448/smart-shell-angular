export type Colors = 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray' | 'green' | 'blue' | 'red' | 'light';

export type ObjColors = Record<string, Record<string, boolean>>

export const COLORS:ObjColors = {
  green: {
    'bg-green-700': true,
    'hover:bg-green-800': true,
    'focus:ring-green-300': true,
    'text-white': true,
  },
  blue: {
    'bg-blue-700': true,
    'hover:bg-blue-800': true,
    'focus:ring-blue-300': true,
    'text-white': true,
  },
  red: {
    'bg-red-700': true,
    'hover:bg-red-800': true,
    'focus:ring-red-300': true,
    'text-white': true,
  },
  light: {
    'bg-gray-200': true,
    'hover:bg-gray-500': true,
    'focus:ring-gray-50': true,
    'text-gray-700': true,
  },
  sky: {
    'bg-sky-700': true,
    'hover:bg-sky-800': true,
    'focus:ring-sky-300': true,
    'text-white': true,
  },
  yellow: {
    'bg-yellow-700': true,
    'hover:bg-yellow-800': true,
    'text-white': true
  },
  violet: {
    'bg-violet-700': true,
    'hover:bg-violet-800': true,
    'text-white': true
  },
  gray: {
    'bg-gray-700': true,
    'hover:bg-gray-800': true,
    'text-white': true
  }
}

export const COLORSOPERAC:ObjColors = {
  green: {
    'bg-green-700': true,
    'hover:bg-green-800': true,
    'focus:ring-green-300': true,
    'text-white': true,
  },
  blue: {
    'bg-blue-700': true,
    'hover:bg-blue-800': true,
    'focus:ring-blue-300': true,
    'text-white': true,
  },
  red: {
    'bg-red-700': true,
    'hover:bg-red-800': true,
    'focus:ring-red-300': true,
    'text-white': true,
    'border-red-600': true,
    'dark:border-red-600': true,
  },
  light: {
    'bg-gray-200': true,
    'hover:bg-gray-500': true,
    'focus:ring-gray-50': true,
    'text-gray-700': true,
  },
  sky: {
    'bg-sky-700': true,
    'hover:bg-sky-800': true,
    'focus:ring-sky-300': true,
    'text-white': true,
    'border-sky-800': true,
    'dark:border-sky-900': true
  },
  yellow: {
    'bg-yellow-700': true,
    'hover:bg-yellow-800': true,
    'text-white': true,
    'border-yellow-800': true,
    'dark:border-yellow-800': true,
  },
  violet: {
    'bg-violet-700': true,
    'hover:bg-violet-800': true,
    'text-white': true
  },
  gray: {
    'bg-gray-700': true,
    'hover:bg-gray-800': true,
    'text-white': true
  }
}
