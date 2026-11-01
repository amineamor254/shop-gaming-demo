# Image guide

Put your image files under `public/`. This `images/` folder is a suggested
location; create subfolders such as `products/`, `blog/` and `hero/` as needed.
A file at `public/images/products/headset.webp` is referenced in code as
`/images/products/headset.webp` (omit `public` from the URL).

| Content | Data field | Frame shape | Suggested size |
| --- | --- | --- | --- |
| Catalog product | `image` on an entry in `data/products.ts` | Landscape 4:3 | 800 × 600 px |
| Featured hero PC | `image` in `FEATURED_PRODUCT` in `data/hero.ts` | Portrait 4:5 | 1200 × 1500 px |
| Featured blog post | Optional `image` on the featured entry in `data/posts.ts` | Wide, about 7:4 | 1400 × 800 px |
| Blog cards | Optional `image` on an entry in `data/posts.ts` | Landscape 4:3 | 800 × 600 px |

## Tips for good results

- **Products** are shown in full (never cropped), so a transparent PNG or WebP
  works best. Leave a little space around the product.
- **Hero, blog and blog cards** are cropped to fill their frame. Keep the main
  subject in the center.
- **Hero:** the "Best seller" badge covers the top-left corner and a dark fade
  covers the bottom 20%. Keep important details out of those areas.
- **Blog cards:** the bottom 20% fades into the card background.
- Aim for under 100 KB for product and card images, and under 200 KB for the
  hero and the featured blog image. WebP and AVIF are good choices; PNG and
  JPEG also work.
- Avoid text, logos and trademarks inside your images, because they cannot be
  edited later and may cause rights problems.

These sizes are recommendations, not enforced dimensions.

## Troubleshooting

If an image does not appear and the terminal shows a 404 for it:

1. Check that the file is really inside `public/`.
2. Compare the path in your data file with the file name letter by letter.
   Names are case-sensitive on most servers, and the extension must match
   exactly (`.webp` is not `.png`).
3. Do not rename a file's extension by hand. Export the image again in the
   format you want.
4. Stop the dev server, delete the `.next` folder and start it again.

Product and blog image fields are optional. When a field is empty, the template
shows a built-in decorative placeholder. The hero image is currently an empty
string, so the hero card shows a placeholder until you set its field.
