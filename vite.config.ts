import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function w3cCssCompliancePlugin(): Plugin {
  return {
    name: 'w3c-css-compliance',
    generateBundle(_, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (fileName.endsWith('.css') && chunk.type === 'asset' && typeof chunk.source === 'string') {
          let css = chunk.source;

          // 1. Remove @property blocks not recognized by CSS3 validator
          css = css.replace(/@property\s+[^{]+\{[^}]+\}/g, '');

          // 2. Clean transition-property list by removing CSS variable tokens
          css = css.replace(/transition-property\s*:\s*[^;}]+/g, (match) => {
            return match.replace(/,--[a-zA-Z0-9_-]+/g, '');
          });

          // 3. Unwrap the Tailwind @supports rule containing margin-trim and rgb(from ...)
          const supportsRegex = /@supports\s*\(\(\(-webkit-hyphens:none[^{]+\{/;
          const match = supportsRegex.exec(css);
          if (match) {
            const start = match.index;
            const braceOpen = match.index + match[0].length - 1;
            let depth = 1;
            let i = braceOpen + 1;
            while (i < css.length && depth > 0) {
              if (css[i] === '{') depth++;
              else if (css[i] === '}') depth--;
              i++;
            }
            if (depth === 0) {
              const inner = css.slice(braceOpen + 1, i - 1);
              css = css.slice(0, start) + inner + css.slice(i);
            }
          }

          // 4. Remove any remaining margin-trim: inline;
          css = css.replace(/margin-trim\s*:\s*inline\s*;?/g, '');

          chunk.source = css;
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), w3cCssCompliancePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

