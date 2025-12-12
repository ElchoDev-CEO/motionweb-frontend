import { FC } from 'react';
import WelcomeItClub from './ItClubSections/WelcomeItClub';
import InternshipProgram from './ItClubSections/InternshipProgram';
import Advantages from './ItClubSections/Advantages';
import ClubStatistics from './ItClubSections/ClubStatistics';
import Contact from './homeSections/Contact';
import Maps from './homeSections/Maps';

const ItClubPage: FC = () => {
	return (
		<>
			<WelcomeItClub />
			<InternshipProgram />
			<Advantages />
			<ClubStatistics />
			<Contact />
			<Maps />
		</>
	);
};

export default ItClubPage;
