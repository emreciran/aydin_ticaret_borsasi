import i18next from 'i18next';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);

const navigationConfig = [
  {
    id: 'home-component',
    title: 'AnaSayfa',
    translate: 'HOME',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: '/',
  },
  {
    id: 'users-component',
    title: 'Kullanıcılar',
    translate: 'USERS',
    type: 'item',
    icon: 'heroicons-outline:users',
    url: 'kullanicilar',
  },
  {
    id: 'announcement-component',
    title: 'Duyurular',
    translate: 'ANNOUNCEMENTS',
    type: 'item',
    icon: 'heroicons-outline:speakerphone',
    url: 'duyuru',
  },
  {
    id: 'news-component',
    title: 'Haberler',
    translate: 'NEWS',
    type: 'item',
    icon: 'heroicons-outline:newspaper',
    url: 'haber',
  },
];

export default navigationConfig;
