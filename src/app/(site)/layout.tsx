import { FC, ReactNode } from 'react';
import LayoutPage from '@/appPages/site/components/layout/LayoutPage';
interface LayoutType {
	children: ReactNode;
}
const Layout: FC<LayoutType> = ({ children }) => (
	<LayoutPage>{children}</LayoutPage>
);
export default Layout;
