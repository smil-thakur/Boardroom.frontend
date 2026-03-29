export const IDEA_CHIPS: string[] = [
  "Tinder but for finding co-founders",
  "AI lawyer that costs $1 per case",
  "Netflix for indie game developers",
  "A startup that pays people to touch grass",
  "Duolingo but for learning to cook",
  "Airbnb for private jets",
  "A DAO that buys failing restaurants",
  "Mental health app for startup founders",
  "Uber but for elderly care",
  "LinkedIn but actually good",
  "A subscription box for introverts",
  "AI personal stylist for men who can't dress",
  "TikTok for professional chefs",
  "Crypto wallet for kids",
  "Freelancer marketplace with no middleman fees",
  "A gym that pays you to show up",
  "Wikipedia but with verified authors",
  "Anonymous feedback tool for toxic workplaces",
  "Dating app where AI breaks the ice for you",
  "Spotify for podcast discovery",
  "A B2B SaaS that automates firing people",
  "Sleep tracking app that optimizes your dreams",
  "Delivery service for homemade food",
  "Carbon credit marketplace for individuals",
  "An app that turns meetings into to-do lists automatically",
];

export const getRandomChips = (count: number = 5): string[] => {
  const shuffled = [...IDEA_CHIPS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
