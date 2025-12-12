import React, { FC } from 'react';
import Welcome from './homeSections/Welcome';
import WeeklyStudentRating from './homeSections/WeeklyStudentRating';
import SomeCourses from './homeSections/SomeCourses';
import AdditionalCourses from './homeSections/AdditionalCourses';
import AboutUs from './homeSections/AboutUs';
import OurMentors from './homeSections/OurMentors';
import StudentsWorkplace from './homeSections/StudentsWorkplace';
import License from './homeSections/License';
import Podcasts from './homeSections/Podcasts';
import Contact from './homeSections/Contact';
import Maps from './homeSections/Maps';

const HomePage: FC = () => {
	return (
		<>
			<Welcome />
			<WeeklyStudentRating />
			<SomeCourses />
			<AdditionalCourses />
			<AboutUs />
			<OurMentors />
			<StudentsWorkplace />
			<License />
			<Podcasts />
			<Contact />
			<Maps />
		</>
	);
};
export default HomePage;
