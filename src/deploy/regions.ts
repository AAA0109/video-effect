import { getRegions } from "@remotion/lambda";

// Two regions were reserved to save the concurrency for other projects.
// Adjust to you own use.
export const usedRegions = getRegions().filter(
  (r) => r == "us-east-1" || r == "us-east-2" || r == "us-west-1" || r == "us-west-2"
);


export const getRandomRegion = () => {
  return usedRegions[Math.floor(Math.random() * usedRegions.length)];
};


