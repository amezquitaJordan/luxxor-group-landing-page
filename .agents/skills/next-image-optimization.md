---
name: next-image-optimization
description: "Next.js Image Optimization for high resolution images."
---

# Next Image Optimization

- Always use `next/image` for performance.
- Use `priority` for above-the-fold hero images.
- Use `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` where appropriate.
- Set `quality={90}` for luxury imagery to avoid compression artifacts.
- Implement correct `alt` tags for SEO.
