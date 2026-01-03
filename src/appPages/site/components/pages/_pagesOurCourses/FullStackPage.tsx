"use client"
import FullStack from './fullStackSections/FullStack';
import ModuleCourseFS from './fullStackSections/ModuleCourseFS';
import Advantages from '../homeSections/Advantages';
import Contact from '../homeSections/Contact';
import Maps from '../homeSections/Maps';
import { useEffect } from 'react';

const FullStackPage = () => {
	useEffect(() => {
			window.scroll(0, 0)
		}, [])
	return (
		<>
			<FullStack />
			<ModuleCourseFS />
			<Advantages titleColor='#d6a99d' spanColor='#7ea04d'/>
			<Contact />
			<Maps />
		</>
	);
};

export default FullStackPage;
