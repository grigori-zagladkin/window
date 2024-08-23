import { FC, PropsWithChildren, ReactNode } from "react";
import styles from './page.module.scss';
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IProps {
    footerVisible?: boolean;
    headerVisible?: boolean;
}

interface ILink {
    title: string;
    link: string;
}

const HEADER_NAV_DATA: ILink[] = [
    {
        title: 'Оплата и доставка',
        link: 'payment_delivery'
    },
    {
        title: 'Контакты',
        link: 'contacts'
    },
    {
        title: 'Акции',
        link: 'promo'
    },
    {
        title: 'Как добраться',
        link: 'contacts'
    },
]

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerTopBlock}>
                <div className={styles.headerLogo}>
                    <span className={styles.headerLogoFirstCaption}>Окна.</span>
                    <span className={styles.headerLogoSecondCaption}>Ярославль</span>
                </div>
                <div className={styles.headerAdditionalBlock}>
                    <div className={styles.headerAdditionalBlockPhone}>+7-996-227-13-37</div>
                    <div className={styles.headerAdditionalBlockWorkTime}>Ежедневно с 08:00-19:00</div>
                </div>
                <ul className={styles.headerNavPanel}>
                    {
                        HEADER_NAV_DATA.map((item, idx) => <Button variant='link' key={idx}>{item.title}</Button>)
                    }
                </ul>
            </div>
            <div className={styles.headerSearch}>
                <Input className={styles.headerSearchInput} placeholder="Поиск..." />
                <Button variant='ghost'>Расширенный поиск</Button>
            </div>
        </header>
    );
};

const Footer: FC = () => {
    return (
        <footer></footer>
    );
}

const Page: FC<PropsWithChildren<IProps>> = ({children, footerVisible = true, headerVisible = true}) => {
    return (
        <div>
            {headerVisible && <Header />}
            <main>
                {children}
            </main>
            {footerVisible && <Footer />}
        </div>
    );
};

export default Page;