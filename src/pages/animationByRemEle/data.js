import pic from './test.svg';
import { uniqueId } from 'lodash';
export const list = [
  {
    id: uniqueId(),
    logo: pic,
    title: 'Card title',
    content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    link: 'https://v5.bootcss.com/docs/components/card/',
  },
];
