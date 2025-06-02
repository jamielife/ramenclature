// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://jamielife.github.io',
    base: 'ramenclature',
    integrations: [mdx(), sitemap()],

    vite: {
      plugins: [tailwindcss()],
    },

    adapter: node({
      mode: 'standalone',
    }),

    image: {
      domains: ["ramen-api.dev"],
    },  
});