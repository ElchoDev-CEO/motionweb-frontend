'use client';
import { FC } from 'react';
import scss from './StudentsWorkplace.module.scss';
import Image from 'next/image';
import students_workplace_1 from '@/assets/div.absolute.png';
import students_workplace_2 from '@/assets/div.w-full.png';
import IconStudentsWorkplace from '@/assets/icons/icon-students-workplace';
import CustomTitle from '@/ui/title/CustomTitle';

const StudentsWorkplace: FC = () => {
	return (
		<section className={scss.StudentsWorkplace}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.block}>
						<div className={scss.top}>
							<div className={scss.tag}>
								<IconStudentsWorkplace />
							</div>
							<CustomTitle
								title="Где работают "
								spanRight="наши студенты"
								color="#000000"
							/>
						</div>
						<Image
							className={scss.students_workplace_1}
							width={1450}
							height={400}
							src={students_workplace_1}
							alt="students_workplace_1"
						/>
						<Image
							className={scss.students_workplace_2}
							width={900}
							height={300}
							src={students_workplace_2}
							alt="students_workplace_2"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StudentsWorkplace;
