import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs.js';
import 'element-plus/dist/index.css';
import localeZH from 'element-plus/es/locale/lang/zh-cn';
import localeEN from 'element-plus/es/locale/lang/en';
import messages from '../utils/i18n';
import chinaCitiesPicker from '@/components/chinaCitiesPicker/install.js';
import ElxSelect from '@c/structuredForm/ElxSelect.vue';
import ElxCheckboxGroup from '@c/structuredForm/ElxCheckboxGroup.vue';
import ElxRadioGroup from '@c/structuredForm/ElxRadioGroup.vue';
const i18n = createI18n({
  locale: localeZH.name,
  fallbackLocale: localeEN.name,
  messages,
});

export default (app) => {
  app.use(ElementPlus, { locale: localeZH });
  app.use(chinaCitiesPicker);
  app.use(i18n);
  app.component('ElxSelect', ElxSelect);
  app.component('ElxCheckboxGroup', ElxCheckboxGroup);
  app.component('ElxRadioGroup', ElxRadioGroup);
};
