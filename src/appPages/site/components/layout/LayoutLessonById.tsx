'use client';
import { FC, ReactNode } from 'react';
import scss from './LayoutLessonById.module.scss';
import { useParams, usePathname } from 'next/navigation';
import StructureAccordion from '@/shared/accordion/StructureAccordion';

interface ILayoutLessonByIdProps {
	children: ReactNode;
}

const LayoutLessonById: FC<ILayoutLessonByIdProps> = ({ children }) => {
	const { courseId } = useParams();
	const pathname = usePathname();

	const shouldShowAccordion =
		pathname.startsWith(`/courses/${courseId}/`) && !pathname.includes('/hw');

	return (
		<div className={scss.LayoutLessonById}>
			<div className="container">
				<div className={scss.content}>
					{children}
					{shouldShowAccordion && (
						<StructureAccordion courseId={Number(courseId)} />
					)}
				</div>
			</div>
		</div>
	);
};

export default LayoutLessonById;
