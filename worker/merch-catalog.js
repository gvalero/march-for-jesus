export const MERCH_CATALOG = [
  {
    id: 'mfj-logo-tshirt-burgundy',
    name: 'MFJ Logo T-shirt',
    colour: 'Burgundy',
    category: 'tshirts',
    fit: 'Classic fit',
    description: 'Official MFJ logo tee in deep burgundy.',
    image: 'images/burgandymfjshirt1.png',
    priceGbp: 20,
    displayEur: 22,
    sizes: [
      { id: 'mfj-logo-tshirt-burgundy-s', label: 'S', stock: 10 },
      { id: 'mfj-logo-tshirt-burgundy-m', label: 'M', stock: 30 },
      { id: 'mfj-logo-tshirt-burgundy-l', label: 'L', stock: 30 },
      { id: 'mfj-logo-tshirt-burgundy-xl', label: 'XL', stock: 10 },
      { id: 'mfj-logo-tshirt-burgundy-2xl', label: '2XL', stock: 10 },
      { id: 'mfj-logo-tshirt-burgundy-3xl', label: '3XL', stock: 10 }
    ]
  },
  {
    id: 'mfj-logo-tshirt-cream',
    name: 'MFJ Logo T-shirt',
    colour: 'Cream',
    category: 'tshirts',
    fit: 'Classic fit',
    description: 'Official MFJ logo tee in warm cream.',
    image: 'images/creammfjshirt1.png',
    priceGbp: 20,
    displayEur: 22,
    sizes: [
      { id: 'mfj-logo-tshirt-cream-s', label: 'S', stock: 10 },
      { id: 'mfj-logo-tshirt-cream-m', label: 'M', stock: 30 },
      { id: 'mfj-logo-tshirt-cream-l', label: 'L', stock: 30 },
      { id: 'mfj-logo-tshirt-cream-xl', label: 'XL', stock: 10 },
      { id: 'mfj-logo-tshirt-cream-2xl', label: '2XL', stock: 10 },
      { id: 'mfj-logo-tshirt-cream-3xl', label: '3XL', stock: 10 }
    ]
  },
  {
    id: 'globe-tshirt-oversized-burgundy',
    name: 'Globe T-shirt',
    colour: 'Burgundy',
    category: 'tshirts',
    fit: 'Oversized fit',
    description: 'Oversized globe design tee in burgundy.',
    image: 'images/burgandyglobeshirt1.png',
    priceGbp: 30,
    displayEur: 35,
    sizes: [
      { id: 'globe-tshirt-oversized-burgundy-s', label: 'S', stock: 10 },
      { id: 'globe-tshirt-oversized-burgundy-m', label: 'M', stock: 15 },
      { id: 'globe-tshirt-oversized-burgundy-l', label: 'L', stock: 15 },
      { id: 'globe-tshirt-oversized-burgundy-xl', label: 'XL', stock: 5 }
    ]
  },
  {
    id: 'globe-tshirt-oversized-cream',
    name: 'Globe T-shirt',
    colour: 'Cream',
    category: 'tshirts',
    fit: 'Oversized fit',
    description: 'Oversized globe design tee in cream.',
    image: 'images/creamglobeshirt1.png',
    priceGbp: 30,
    displayEur: 35,
    sizes: [
      { id: 'globe-tshirt-oversized-cream-s', label: 'S', stock: 10 },
      { id: 'globe-tshirt-oversized-cream-m', label: 'M', stock: 10 },
      { id: 'globe-tshirt-oversized-cream-l', label: 'L', stock: 10 },
      { id: 'globe-tshirt-oversized-cream-xl', label: 'XL', stock: 5 }
    ]
  },
  {
    id: 'matthew-2819-tshirt-oversized-cream',
    name: 'Matthew 28:19 T-shirt',
    colour: 'Cream',
    category: 'tshirts',
    fit: 'Oversized fit',
    description: 'Oversized Matthew 28:19 design tee in cream.',
    image: 'images/matthewshirt1.png',
    priceGbp: 30,
    displayEur: 35,
    sizes: [
      { id: 'matthew-2819-tshirt-oversized-cream-s', label: 'S', stock: 10 },
      { id: 'matthew-2819-tshirt-oversized-cream-m', label: 'M', stock: 10 },
      { id: 'matthew-2819-tshirt-oversized-cream-l', label: 'L', stock: 10 },
      { id: 'matthew-2819-tshirt-oversized-cream-xl', label: 'XL', stock: 5 }
    ]
  },
  {
    id: 'mfj-cap-burgundy',
    name: 'MFJ Cap',
    colour: 'Burgundy',
    category: 'caps',
    fit: 'One size',
    description: 'Official MFJ cap in burgundy.',
    image: 'images/burgandycap1.png',
    priceGbp: 20,
    displayEur: 22,
    sizes: [
      { id: 'mfj-cap-burgundy-one-size', label: 'One Size', stock: 25 }
    ]
  },
  {
    id: 'mfj-cap-cream',
    name: 'MFJ Cap',
    colour: 'Cream',
    category: 'caps',
    fit: 'One size',
    description: 'Official MFJ cap in cream.',
    image: 'images/creamcap1.png',
    priceGbp: 20,
    displayEur: 22,
    sizes: [
      { id: 'mfj-cap-cream-one-size', label: 'One Size', stock: 26 }
    ]
  }
];

export function listVariants() {
  return MERCH_CATALOG.flatMap((product) => product.sizes.map((size) => ({
    id: size.id,
    productId: product.id,
    productName: product.name,
    colour: product.colour,
    category: product.category,
    fit: product.fit,
    size: size.label,
    priceGbp: product.priceGbp,
    displayEur: product.displayEur,
    initialStock: size.stock,
    image: product.image
  })));
}

export function findVariant(variantId) {
  return listVariants().find((variant) => variant.id === variantId) || null;
}
