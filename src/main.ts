import { mount } from 'birrstack-core';
import { initTheme } from './lib/theme';
import App from './App.birr';

initTheme();
mount(App, document.getElementById('app')!);
