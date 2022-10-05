import faker from 'faker';
import _ from 'lodash';
import { config } from '../services/config';

const brandAndImage = _.flatten(
  _.times(20, (i) => {
    return [
      'hp',
      'mac',
      'pantalla',
      'ram',
      'rom',
      'smarttv',
      'teclado',
      'torre',
    ].map((brand, j) => {
      return { brand, image: `${brand}${i + 1}.jpg` };
    });
  }),
);

const imageColorMap = [
  { brand: 'hp1', color: 'black' },
  { brand: 'hp2', color: 'white' },
  { brand: 'hp3', color: 'blue' },
  { brand: 'mac1', color: 'black' },
  { brand: 'mac2', color: 'silver' },
  { brand: 'pantalla1', color: 'black' },
  { brand: 'pantalla2', color: 'black' },
  { brand: 'pantalla3', color: 'black' },
  { brand: 'ram', color: 'green' },
  { brand: 'rom', color: 'black' },
  { brand: 'smarttv1', color: 'black' },
  { brand: 'smarttv2', color: 'black' },
  { brand: 'smarttv3', color: 'black' },
  { brand: 'teclado1', color: 'black' },
  { brand: 'teclado2', color: 'black' },
  { brand: 'teclado3', color: 'black' },
  { brand: 'teclado4', color: 'white' },
  { brand: 'torre1', color: 'black' },
  { brand: 'torre2', color: 'black' },
  { brand: 'torre3', color: 'black' },
  { brand: 'torre4', color: 'white' },
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getProducts = () => {
  const products = _.times(100, (index) => {
    const color = imageColorMap.find(
      (i) => i.brand === brandAndImage[index].image.replace('.jpg', ''),
    ).color;
    // console.log(color);
    return {
      id: index,
      isAdvert: false,
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      brand: brandAndImage[index].brand,
      image: brandAndImage[index].image,
      color: color,
      size: getRandomInt(3, 20),
      weight: getRandomInt(4, 40),
      shortDescription: faker.lorem.words(),
      modelNum: faker.random.number(),
      delivery: [
        faker.address.country(),
        faker.address.country(),
        faker.address.country(),
      ].join(', '),
      description: faker.lorem.paragraph().split('.', 2).join('.') + '.',
    };
  }).sort((a, b) => 0.5 - Math.random());
  return products;
};

const advertisements = _.times(10, (index) => ({
  id: index,
  isAdvert: true,
  name: faker.commerce.productName(),
  image: faker.image.business(),
  description: faker.lorem.paragraph().split('.', 3).join('.') + '.',
  link1: faker.internet.url(),
  link2: faker.internet.url(),
  time: faker.date.recent(),
}));

export const getProductsData = (params) => {
  //params = { page: { index: 0, size: 15 }, filter: 'mepps', sort: {key:'price', direction:'asc'} };
  let products = getProducts();

  if (params && 'filter' in params && params.filter.brand !== 'none')
    products = products.filter(
      (product) => product.brand === params.filter.brand,
    );

  if (params && 'filter' in params && params.filter.color !== 'none')
    products = products.filter(
      (product) => product.color === params.filter.color,
    );

  if (params && 'sort' in params && params.sort.key !== 'none') {
    function compare(a, b) {
      if (a[params.sort.key] < b[params.sort.key]) return -1;
      if (a[params.sort.key] > b[params.sort.key]) return 1;
      return 0;
    }
    products = products.sort(compare);
    if (params.sort.direction === 'desc') products = products.reverse();
  }

  if (params && 'page' in params) {
    products = products.slice(
      parseInt(params.page.index),
      parseInt(params.page.index) + parseInt(params.page.size),
    );
  }

  return products;
};
export const getProductData = (id) => {
  let products = getProducts();
  let product = {};
  id = parseInt(id);

  if (!Number.isNaN(id) && products.length > id)
    product = products.find((product) => product.id === id);

  return product;
};
export const getAdvertisementsData = () => advertisements;
