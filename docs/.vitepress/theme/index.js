import DefaultTheme from 'vitepress/theme';
import DarkModeImage from './DarkModeImage.vue';
import GureckisLabText from './GureckisLabText.vue';
import SmileText from './SmileText.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('DarkModeImage', DarkModeImage);
    app.component('GureckisLabText', GureckisLabText);
    app.component('SmileText', SmileText);
  },
};
