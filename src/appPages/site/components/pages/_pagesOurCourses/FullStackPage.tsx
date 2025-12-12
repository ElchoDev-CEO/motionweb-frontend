import FullStack from './fullStackSections/FullStack';
import ModuleCourseFS from './fullStackSections/ModuleCourseFS';
import Advantages from '../homeSections/Advantages';
import Contact from '../homeSections/Contact';
import Maps from '../homeSections/Maps';

const FullStackPage = () => {
	return (
		<>
			<FullStack />
			<ModuleCourseFS />
			<Advantages />
			<Contact />
			<Maps />
		</>
	);
};

export default FullStackPage;
