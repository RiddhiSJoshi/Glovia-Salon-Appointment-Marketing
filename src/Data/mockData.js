import hairImage from "../Images/hair-mark.png";
import skinImage from "../Images/skin-mark.png";
import nailImage from "../Images/nail-mark.png";
import makeupImage from "../Images/makeup-mark.png";

import glowStudio from "../Images/glow-studio.png";
import beautyLounge from "../Images/beauty-lounge.png";
import velvetSalon from "../Images/velvet-salon.png";

export const categories = [
  {
    id: 1,
    name: "Hair",
    description: "Haircuts, styling, coloring and treatments.",
    image: hairImage,
  },
  {
    id: 2,
    name: "Skin",
    description: "Facials, cleanup and professional skin treatments.",
    image: skinImage,
  },
  {
    id: 3,
    name: "Nails",
    description: "Manicure, pedicure and beautiful nail art.",
    image: nailImage,
  },
  {
    id: 4,
    name: "Makeup",
    description: "Professional makeup for every special occasion.",
    image: makeupImage,
  },
];

export const salons = [
  {
    id: 1,
    name: "Glow Studio",
    location: "Chennai",
    rating: 4.8,
    image: glowStudio,
  },
  {
    id: 2,
    name: "The Beauty Lounge",
    location: "Chennai",
    rating: 4.7,
    image: beautyLounge,
  },
  {
    id: 3,
    name: "Velvet Salon",
    location: "Bengaluru",
    rating: 4.9,
    image: velvetSalon,
  },
];