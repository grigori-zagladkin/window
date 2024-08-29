import PageComponent from '@/components/page';
import AuthPage from "@/pages/Auth";

const Page = async () => {
    return (
        <PageComponent
            footerVisible={false}
            headerVisible={false}
        >
            <AuthPage />
        </PageComponent>
    );
};

export default Page;