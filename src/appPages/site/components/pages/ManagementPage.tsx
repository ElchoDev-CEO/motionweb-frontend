import { FC } from 'react';
import OurOwners from './managementSections/OurOwners';
import Contact from './homeSections/Contact';
import Maps from './homeSections/Maps';

const ManagementPage: FC = () => {
	return (
		<>
			<OurOwners />
			<Contact />
			<Maps />
		</>
	);
};

export default ManagementPage;
