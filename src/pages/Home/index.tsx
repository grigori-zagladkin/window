import { FC } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import AdminPanel from '@/components/AdminPanel';

const CATEGORIES_DATA = [
  {
    title: 'Окна',
    subCategories: [
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
    ],
  },
  {
    title: 'Двери',
    subCategories: [
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
    ],
  },
  {
    title: 'Фурнитура',
    subCategories: [
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
    ],
  },
  {
    title: 'Другое',
    subCategories: [
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
      {
        title: 'Окна ПВХ новые',
        link: '/products',
      },
    ],
  },
];

const CategoryBlock = () =>
  CATEGORIES_DATA.map((item, idx) => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem key={idx}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            {item.subCategories.map((subItem, subIdx) => (
              <NavigationMenuLink key={idx + ' ' + subIdx}>{subItem.title}</NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ));

const HomePage: FC = () => {
  return (
    <div className="mx-auto max-w-[80%]">
      <div className="flex justify-center gap-8 py-4">
        <CategoryBlock />
        <AdminPanel />
      </div>
    </div>
  );
};

export default HomePage;
