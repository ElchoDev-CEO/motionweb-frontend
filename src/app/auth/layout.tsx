import { FC, ReactNode } from 'react';
interface LayoutType {
	children: ReactNode;
}
const Layout: FC<LayoutType> = ({ children }) => children;
export default Layout;
