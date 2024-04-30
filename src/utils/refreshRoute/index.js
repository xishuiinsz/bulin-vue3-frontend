import router from '@/router';
import comeBack from './comeBack.vue';
const route = {
  path: '/comeBack',
  name: 'ComeBack',
  meta: {
    title: '我会回来的',
  },
  component: comeBack,
};
router.addRoute(route);
const refreshRoute = () => {
  router.push({ name: 'ComeBack' });
};
export default refreshRoute;
