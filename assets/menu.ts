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
  {
    name: 'Dynamic Programming',
    pages: [
      { name: 'Longest common subsequence', to: '/alg/lcs' },
    ],
  },
  {
    name: 'Misc',
    pages: [
      { name: 'Brainfuck interpreter', to: '/alg/bf' },
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
