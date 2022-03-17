export const algCategories = [
  {
    name: 'Strings',
    pages: [
      { name: 'Knuth–Morris–Pratt algorithm', to: '/alg/kmp' },
    ],
  },
  {
    name: 'Array',
    pages: [
      { name: 'Fisher–Yates shuffle', to: '/alg/shuffle' },
    ],
  },
];

export const algNavItems = algCategories.flatMap(
  ({ name, pages }) => [
    null,
    { name },
    ...pages,
  ],
);
