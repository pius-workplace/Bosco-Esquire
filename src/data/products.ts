// Bosco Esquire catalogue.
// Sources: boscoesquire.com shop + price list PDF (Aug 2026) + WhatsApp Business catalogue (Nov 2026).
// Prices marked `confirm: true` differ between sources and must be confirmed with Bosco before launch.

export type Collection = 'naturals' | 'atelier'
export type Category =
  | 'Honey & Hive' | 'Body Care' | 'Pantry' | 'Home & Aroma' | 'Apéritifs & Digestifs'
  | 'Leather Bags' | 'Small Leather' | 'Canvas & Knit' | 'Objects & Drinkware'

export interface Variant { label: string; price: number }
export interface Product {
  slug: string
  name: string
  collection: Collection
  category: Category
  variants: Variant[]          // one entry = single price; 0 = price on request
  images: string[]             // real Bosco photos; empty = branded tile until the photo shoot
  cutout?: string              // transparent product image for hero / 3D moments
  short: string
  details: string[]
  source?: string
  bestseller?: boolean
  isNew?: boolean
  has3d?: boolean
  confirm?: boolean
}

const P = (p: string) => `img/products/${p}.jpg`
const W = (p: string) => `img/wa/${p}.jpg`

export const products: Product[] = [
  // ---------- Honey & Hive ----------
  { slug: 'raw-honey', name: 'Raw Honey', collection: 'naturals', category: 'Honey & Hive',
    variants: [{ label: '250 g', price: 400 }, { label: '500 g', price: 700 }, { label: '900 g', price: 1200 }],
    images: [P('honey'), P('bee-hive')], cutout: 'img/cut/honey.webp', bestseller: true, has3d: true,
    short: 'Golden, unheated raw honey from Kenyan hives — thick, floral and just as the bees made it.',
    details: ['Raw and unblended', 'A classic stirred into warm water with lemon and ginger', 'Natural sweetener for tea, porridge and baking', 'Store at room temperature; crystallisation is natural'],
    source: 'Bosco Farms and partner beekeepers, Kenya' },
  { slug: 'honeycomb-honey', name: 'Honeycomb + Honey', collection: 'naturals', category: 'Honey & Hive',
    variants: [{ label: '355 g', price: 550 }], images: [],
    short: 'A slab of capped comb sitting in its own raw honey — chew the wax, spread the honey.',
    details: ['Comb straight from the frame', 'Perfect on toast, cheese boards and yoghurt'] , source: 'Bosco Farms' },
  { slug: 'honeycomb', name: 'Honeycomb (by weight)', collection: 'naturals', category: 'Honey & Hive',
    variants: [{ label: '100 g', price: 200 }, { label: '250 g', price: 500 }], images: [],
    short: 'Fresh-cut comb sold by weight for platters, gifting and the curious.', details: ['Priced at KES 2 per gram'] },
  { slug: 'propolis-tincture', name: 'Propolis Tincture', collection: 'naturals', category: 'Honey & Hive',
    variants: [{ label: 'Dropper bottle', price: 500 }], images: [P('propolis-pair'), P('tincture-single')], cutout: 'img/cut/tincture.webp', bestseller: true,
    short: 'Bee propolis drawn into a dropper bottle — a hive tradition kept close at hand.',
    details: ['Traditionally taken a few drops in water or honey', 'Amber glass protects from light'], source: 'Bosco apiaries' },
  { slug: 'propolis-honey', name: 'Propolis + Honey', collection: 'naturals', category: 'Honey & Hive',
    variants: [{ label: 'Jar', price: 1000 }], images: [], short: 'Raw honey infused with propolis.', details: ['Spoon into warm drinks'] },
  { slug: 'propolis-honey-ginger', name: 'Propolis + Honey + Ginger', collection: 'naturals', category: 'Honey & Hive',
    variants: [{ label: 'Jar', price: 1000 }], images: [], short: 'Raw honey, propolis and a warming kick of ginger.', details: ['A cold-season favourite at our stall'] },
  { slug: 'beeswax', name: 'Pure Beeswax', collection: 'naturals', category: 'Honey & Hive',
    variants: [{ label: '100 g', price: 150 }, { label: '500 g', price: 750 }], images: [],
    short: 'Natural beeswax for balms, candles and wood care.', details: ['Priced at KES 1.50 per gram'] },

  // ---------- Body Care ----------
  { slug: 'body-butter', name: 'Bosco Body Butters', collection: 'naturals', category: 'Body Care',
    variants: [{ label: '170 g', price: 650 }, { label: '210 g', price: 900 }],
    images: [P('butter-pair'), P('butter-jar'), W('butters-basket')], cutout: 'img/cut/butter.webp', bestseller: true, confirm: true,
    short: 'Rich, whipped body butters in strawberry, lemongrass, lavender, mint and orange.',
    details: ['Customers call it "super moisturising"', 'Melts on warm skin', 'Several scents — ask for this week\'s range'] },
  { slug: 'body-whip', name: 'Body Whip', collection: 'naturals', category: 'Body Care',
    variants: [{ label: '170 g', price: 1300 }], images: [], short: 'Airy whipped butter that sinks in fast.', details: [] },
  { slug: 'body-scrub', name: 'Body Scrub', collection: 'naturals', category: 'Body Care',
    variants: [{ label: 'Jar', price: 1100 }], images: [], short: 'Exfoliating scrub for soft, bright skin.', details: [] },
  { slug: 'hand-cream', name: 'Hand Cream', collection: 'naturals', category: 'Body Care',
    variants: [{ label: '50 g', price: 350 }], images: [], short: 'Pocket-size hand cream for dry days.', details: [] },
  { slug: 'lip-balm', name: 'Lip Balm', collection: 'naturals', category: 'Body Care',
    variants: [{ label: 'Tube', price: 200 }], images: [], short: 'Beeswax lip balm.', details: [] },
  { slug: 'healthy-living-oils', name: 'Healthy Living Oils', collection: 'naturals', category: 'Body Care',
    variants: [{ label: '30 ml', price: 400 }, { label: '100 ml', price: 900 }], images: [], short: 'Botanical oils in dropper bottles.', details: [] },
  { slug: 'massage-oil', name: 'Massage Oil', collection: 'naturals', category: 'Body Care',
    variants: [{ label: '250 ml', price: 1800 }], images: [], short: 'Slow, warming massage oil.', details: [] },

  // ---------- Home & Aroma ----------
  { slug: 'aromatherapy-candles', name: 'Aromatherapy Candles', collection: 'naturals', category: 'Home & Aroma',
    variants: [{ label: 'Standard', price: 500 }, { label: 'Mini', price: 800 }, { label: 'Supreme', price: 1000 }],
    images: [P('candle-jar'), P('candle-lit'), W('candles-set')], bestseller: true, confirm: true,
    short: 'Hand-poured scented candles in orange, mint and more — glass jars with bamboo lids.',
    details: ['Long, even burn', 'Lovely as a gift'] },

  // ---------- Pantry ----------
  { slug: 'macadamia-nuts', name: 'Roasted Macadamia Nuts', collection: 'naturals', category: 'Pantry',
    variants: [{ label: 'Pouch', price: 0 }], images: [P('macadamia-pair'), P('macadamia-forest')], cutout: 'img/cut/nuts.webp', bestseller: true,
    short: 'Small-batch, hand-roasted macadamias in a resealable pouch.', details: ['Snack, salad topper, baking'], source: 'Kenyan macadamia growers' },
  { slug: 'chilli-honey-crunch', name: 'Chilli Honey Crunch', collection: 'naturals', category: 'Pantry', isNew: true,
    variants: [{ label: 'Jar', price: 300 }], images: [W('chilli-honey-crunch')],
    short: 'Sunflower seeds and roasted nuts glazed in honey with a chilli kick.', details: ['Ingredients: sunflower seeds, roasted nuts, honey, chilli'] },
  { slug: 'chilli-kick-snackers', name: 'Chilli Kick Snackers', collection: 'naturals', category: 'Pantry', isNew: true,
    variants: [{ label: 'Jar', price: 0 }], images: [],
    short: 'Crunchy sunflower seeds and roasted nuts with heat.', details: ['Ingredients: sunflower seeds, roasted nuts, chilli'] },
  { slug: 'chia-seeds', name: 'Chia Seeds', collection: 'naturals', category: 'Pantry',
    variants: [{ label: '100 g', price: 400 }], images: [], short: 'Clean chia for puddings and smoothies.', details: [] },
  { slug: 'macadamia-cookie', name: 'Macadamia & Chocolate Cookie', collection: 'naturals', category: 'Pantry',
    variants: [{ label: 'Each', price: 50 }], images: [], short: 'Our stall favourite.', details: [] },
  { slug: 'high-tea-scone', name: 'Organic High-Tea Scone', collection: 'naturals', category: 'Pantry',
    variants: [{ label: 'Each', price: 200 }], images: [], short: 'Raisin-topped, stuffed with chocolate and crushed macadamia.', details: [] },

  // ---------- Apéritifs & Digestifs ----------
  { slug: 'sate-banana-honey-wine', name: 'Satè Banana-Honey Wine', collection: 'naturals', category: 'Apéritifs & Digestifs',
    variants: [{ label: 'Sweet', price: 650 }], images: [P('wine-sate'), P('wine-pour'), W('wine-sate-wa')], cutout: 'img/cut/wine.webp', bestseller: true, confirm: true,
    short: 'Bosco\'s own sweet banana-honey wine — golden, fruity and made to share.', details: ['Serve chilled', 'Over 18s only'] },
  { slug: 'summer-breeze-banana-wine', name: 'Summer Breeze Banana Wine', collection: 'naturals', category: 'Apéritifs & Digestifs',
    variants: [{ label: 'Semi-dry', price: 650 }], images: [W('summer-breeze')], confirm: true,
    short: 'A lighter, semi-dry banana wine for warm afternoons.', details: ['Serve chilled', 'Over 18s only'] },
  { slug: 'arabica-haven', name: 'Arabica Haven Coffee Brandy', collection: 'naturals', category: 'Apéritifs & Digestifs', isNew: true,
    variants: [{ label: '330 ml', price: 1350 }], images: [W('arabica-haven')],
    short: 'A coffee and star-anise brandy — a Kenyan after-dinner digestif.', details: ['Over 18s only'] },
  { slug: 'banana-honey-wine-750', name: 'Banana Honey Wine 750 ml', collection: 'naturals', category: 'Apéritifs & Digestifs',
    variants: [{ label: '750 ml', price: 2150 }], images: [P('wine-pour')], confirm: true,
    short: 'The full bottle of our organic banana-honey wine.', details: ['Over 18s only'] },

  // ---------- Atelier: Leather Bags ----------
  { slug: 'leather-tote-bag', name: 'Leather Tote Bag', collection: 'atelier', category: 'Leather Bags',
    variants: [{ label: 'One size', price: 18500 }], images: [P('leather-tote'), P('tote-model')], bestseller: true,
    short: 'A roomy, hand-stitched leather tote that softens and darkens with every year.', details: ['Full-grain leather', 'Zip pocket and branded leather tag', 'Made by Kenyan artisans'] },
  { slug: 'cowhide-leather-bag', name: 'Cowhide Leather Bag', collection: 'atelier', category: 'Leather Bags',
    variants: [{ label: 'One size', price: 15000 }], images: [P('cowhide-bag')],
    short: 'Natural hair-on cowhide with dark leather straps — no two are the same.', details: ['Every hide is unique'] },
  { slug: 'leather-laptop-bag', name: 'Leather Laptop Bag', collection: 'atelier', category: 'Leather Bags',
    variants: [{ label: 'One size', price: 18000 }], images: [P('leather-messenger')], cutout: 'img/cut/leatherbag.webp',
    short: 'A tan messenger with buckle straps, embossed ESQUIRE on the flap.', details: ['Padded laptop compartment'] },
  { slug: 'travel-duffel', name: 'Travel Duffel', collection: 'atelier', category: 'Leather Bags', variants: [{ label: 'One size', price: 23000 }], images: [], short: 'A weekend duffel built to travel for decades.', details: [] },
  { slug: 'shoulder-bag', name: 'Shoulder Bag', collection: 'atelier', category: 'Leather Bags', variants: [{ label: 'One size', price: 14000 }], images: [], short: 'Everyday leather shoulder bag.', details: [] },
  { slug: 'vintage-handbag', name: 'Vintage Style Handbag', collection: 'atelier', category: 'Leather Bags', variants: [{ label: 'One size', price: 15000 }], images: [], short: 'A structured handbag with a vintage line.', details: [] },
  { slug: 'guitar-leather-bag', name: 'Guitar Leather Bag', collection: 'atelier', category: 'Leather Bags', variants: [{ label: 'One size', price: 27000 }], images: [], short: 'A leather gig bag for your guitar.', details: [] },
  { slug: 'camera-carrier-bag', name: 'Cowhide Camera Carrier Bag', collection: 'atelier', category: 'Leather Bags', variants: [{ label: 'One size', price: 15000 }], images: [], short: 'Padded cowhide carrier for your camera.', details: [] },
  { slug: 'leather-rag-sack', name: 'Leather Rag Sack', collection: 'atelier', category: 'Leather Bags', variants: [{ label: 'One size', price: 12000 }], images: [], short: 'Slouchy drawstring leather sack.', details: [] },
  { slug: 'leather-toiletries-bag', name: 'Leather Toiletries Bag', collection: 'atelier', category: 'Leather Bags', variants: [{ label: 'One size', price: 12000 }], images: [], short: 'A travel wash bag in leather.', details: [] },

  // ---------- Small Leather ----------
  { slug: 'laptop-sleeve', name: 'Laptop Sleeve', collection: 'atelier', category: 'Small Leather',
    variants: [{ label: 'One size', price: 10000 }], images: [P('sleeve-pink')], short: 'A slim leather sleeve with the Bosco Esquire mark.', details: ['Available in colours — ask on WhatsApp'] },
  { slug: 'mens-wallet', name: "Men's Wallet", collection: 'atelier', category: 'Small Leather', variants: [{ label: 'One size', price: 3500 }], images: [], short: 'Bifold leather wallet.', details: [] },
  { slug: 'ladies-wallet', name: 'Ladies Wallet', collection: 'atelier', category: 'Small Leather', variants: [{ label: 'One size', price: 4500 }], images: [], short: 'Zip-around leather wallet.', details: [] },
  { slug: 'bible-cover', name: 'Leather Bible Cover', collection: 'atelier', category: 'Small Leather', variants: [{ label: 'One size', price: 4500 }], images: [], short: 'Hand-stitched leather cover.', details: [] },
  { slug: 'key-holder', name: 'Key Holder', collection: 'atelier', category: 'Small Leather', variants: [{ label: 'One size', price: 1000 }], images: [], short: 'Leather key holder.', details: [] },

  // ---------- Canvas & Knit ----------
  { slug: 'canvas-tote', name: 'Bosco Canvas Tote', collection: 'atelier', category: 'Canvas & Knit',
    variants: [{ label: 'One size', price: 4500 }], images: [P('apparel-crew')],
    short: 'Our printed canvas tote — the one customers keep asking about.', details: ['Printed Bosco Esquire mark'] },
  { slug: 'knitted-socks', name: 'Hand-knitted Socks', collection: 'atelier', category: 'Canvas & Knit', variants: [{ label: 'Pair', price: 5000 }], images: [], short: 'Hand-knitted, warm and long-lasting.', details: [] },
  { slug: 'knitted-wine-carrier', name: 'Knitted Wine Carrier', collection: 'atelier', category: 'Canvas & Knit', variants: [{ label: 'One size', price: 2500 }], images: [], short: 'Carry a bottle in style.', details: [] },

  // ---------- Objects & Drinkware ----------
  { slug: 'notebook', name: 'Leather Notebook', collection: 'atelier', category: 'Objects & Drinkware', variants: [{ label: 'Small', price: 2500 }, { label: 'Large', price: 4500 }], images: [], short: 'Leather-bound notebook.', details: [] },
  { slug: 'tumbler', name: 'Bosco Esquire Tumbler', collection: 'atelier', category: 'Objects & Drinkware', variants: [{ label: 'One size', price: 2000 }], images: [], short: 'Branded insulated tumbler.', details: [] },
  { slug: 'stanley-cup', name: 'Stanley Cup', collection: 'atelier', category: 'Objects & Drinkware', variants: [{ label: 'One size', price: 2500 }], images: [], short: 'Insulated cup.', details: [] },
  { slug: 'chopsticks', name: 'Chopsticks', collection: 'atelier', category: 'Objects & Drinkware', variants: [{ label: 'Pair', price: 2000 }, { label: 'With leather carrier', price: 3500 }], images: [], short: 'Wooden chopsticks, optional leather carrier.', details: [] },
]

export const categories: { name: Category; collection: Collection; image: string; blurb: string }[] = [
  { name: 'Honey & Hive', collection: 'naturals', image: P('honey'), blurb: 'Raw honey, comb, propolis' },
  { name: 'Body Care', collection: 'naturals', image: P('butter-pair'), blurb: 'Butters, scrubs, oils' },
  { name: 'Apéritifs & Digestifs', collection: 'naturals', image: P('wine-sate'), blurb: 'Banana-honey wines, brandy' },
  { name: 'Home & Aroma', collection: 'naturals', image: P('candle-lit'), blurb: 'Hand-poured candles' },
  { name: 'Pantry', collection: 'naturals', image: P('macadamia-pair'), blurb: 'Macadamia, crunch, bakes' },
  { name: 'Leather Bags', collection: 'atelier', image: P('leather-messenger'), blurb: 'Totes, duffels, laptop bags' },
]

export const priceOf = (p: Product) => Math.min(...p.variants.map(v => v.price))
export const fmt = (n: number) => n === 0 ? 'Ask on WhatsApp' : 'KES ' + n.toLocaleString('en-KE')
export const priceLabel = (p: Product) => {
  const min = priceOf(p)
  if (min === 0) return 'Ask on WhatsApp'
  return (p.variants.length > 1 ? 'from ' : '') + fmt(min)
}
export const bySlug = (s: string) => products.find(p => p.slug === s)
export const WHATSAPP = '254719487713'
export const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
