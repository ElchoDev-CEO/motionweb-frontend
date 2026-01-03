"use client"
import Python from './pythonSections/Python';
import ModuleCoursePython from './pythonSections/ModuleCoursePython';
import Advantages from '../homeSections/Advantages';
import Contact from '../homeSections/Contact';
import Maps from '../homeSections/Maps';
import { useEffect } from 'react';

const PythonPage = () => {
	useEffect(() => {
		window.scroll(0, 0)
	}, [])
	return (
		<>
			<Python />
			<ModuleCoursePython />
			<Advantages titleColor='#B7B7B7' spanColor='#715A5A' />
			<Contact />
			<Maps />
		</>
	);
};

export default PythonPage;
