# Image guide

Put your image files under `public/`. This `images/` folder is a suggested
location; create subfolders such as `products/` and `blog/` as needed. A file
at `public/images/products/headset.webp` is referenced in code as
`/images/products/headset.webp` (omit `public` from the URL).

| Content | Data field | Suggested dimensions |
| --- | --- | --- |
| Catalog product | `image` on an entry in `data/products.ts` | Square, about 1000 × 1000 px |
| Blog card | Optional `image` on an entry in `data/posts.ts` | 1200 × 675 px (16:9) |
| Featured hero PC | `image` in `FEATURED_PRODUCT` in `data/hero.ts` | About 1600 × 1000 px |

These are recommendations, not enforced dimensions. Keep important content
inside the crop area and use appropriately sized, optimized images. WebP and
AVIF are good choices where your image tools and target browsers support them;
PNG and JPEG can also be used.

Product and blog image fields are optional. The hero's image is currently an
empty string, so no hero image is shown until you set its field. The sample
catalog and blog entries do not currently set image fields.
