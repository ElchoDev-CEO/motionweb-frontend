"use client"
import Kids from './kidsSections/Kids';
import ModuleCourseKids from './kidsSections/ModuleCourseKids';
import Advantages from '../homeSections/Advantages';
import Contact from '../homeSections/Contact';
import Maps from '../homeSections/Maps';
import { useEffect } from 'react';

const KidsPage = () => {
	useEffect(() => {
			window.scroll(0, 0)
		}, [])
	return (
		<>
			<Kids />
			<ModuleCourseKids />
			<Advantages titleColor='#ffe08f' spanColor='#1a2a4f' />
			<Contact />
			<Maps />
		</>
	);
};

export default KidsPage;
