import type { Plugin } from 'vite';
import { compile } from 'birrstack-compiler';

export function birrVitePlugin(): Plugin {
  return {
    name: 'birrstack',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.birr')) return null;
      const result = compile(code, { coreImport: 'birrstack-core' });
      return { code: result.code, map: null };
    },
  };
}
