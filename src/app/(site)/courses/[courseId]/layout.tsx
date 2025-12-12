import { FC, ReactNode } from 'react';
import LayoutLessonById from '@/appPages/site/components/layout/LayoutLessonById';

interface ILayoutClientProps {
	children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
	return <LayoutLessonById>{children}</LayoutLessonById>;
};

export default LayoutClient;
