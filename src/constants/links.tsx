// Базовые объекты ссылок для переиспользования
const links = {
	main: {
		name: 'Главная',
		nameEn: 'Main',
		nameKg: 'Башкы бет',
		href: '/'
	},
	questions: {
		name: 'Вопросы',
		nameEn: 'Questions',
		nameKg: 'Суроолор',
		href: '/questions'
	},
	myCourses: {
		name: 'Мои курсы',
		nameEn: 'My courses',
		nameKg: 'Курстарым',
		href: '/courses'
	},
	myGroups: {
		name: 'Мои группы',
		nameEn: 'My groups',
		nameKg: 'Группаларым',
		href: '/groups'
	},

	contracts: {
		name: 'Контракты',
		nameEn: 'Contacts',
		nameKg: 'Контакттар',
		href: '/contracts'
	},
	motionAI: {
		name: 'Motion AI',
		nameEn: 'Motion AI',
		nameKg: 'Motion AI',
		href: '/motion-ai'
	},
	profile: {
		name: 'Мой профиль',
		nameEn: 'My profile',
		nameKg: 'Менин профилим',
		href: '/profile'
	}
};

const extraLinks = {
	python: {
		name: 'Python для всех',
		nameEn: 'Python for everyone',
		nameKg: 'Python баары учун',
		href: '/our-courses/python'
	},
	fullstack: {
		name: 'Fullstack курс',
		nameEn: 'Fullstack course',
		nameKg: 'Fullstack курсу',
		href: '/our-courses/full-stack'
	},
	kids: {
		name: 'IT для детей',
		nameEn: 'IT for kids',
		nameKg: 'IT балдар учун',
		href: 'our-courses/kids'
	}
};
// Функция для создания ссылок на курсы
const createCourseLink = (
	name: string,
	nameEn: string,
	nameKg: string,
	slug: string
) => ({
	name,
	nameEn,
	nameKg,
	href: `/our-courses/${slug}`
});

// Главное меню для обычных пользователей
export const siteLinks = [
	links.main,
	links.questions,
	links.myCourses,
	links.myGroups
];

export const extraSiteLinks = [
	extraLinks.python,
	extraLinks.fullstack,
	extraLinks.kids
];

// Функция для создания меню профиля в зависимости от роли пользователя
export const getMenuLinks = (role: UserRole) => {
	// Базовая ссылка на профиль доступна всем
	const menuLinks = [links.profile];

	// Контракты доступны для admin, mentor и manager
	if (['ADMIN', 'MANAGER', 'MENTOR'].includes(role)) {
		menuLinks.push(links.contracts);
	}

	// Motion AI доступен только для admin
	if (role === 'ADMIN') {
		menuLinks.push(links.motionAI);
	}

	return menuLinks;
};

// Пример использования
// const userRole: UserRole = 'admin';
// export const menuLinks = getMenuLinks(userRole);

// Выпадающее меню с ресурсами
export const dropDownMenuResources = [
	{ name: 'IT Клуб', nameEn: 'IT Club', href: '/it-club' },
	{ name: 'О руководстве', nameEn: 'About management', href: '/management' }
];

// Выпадающее меню с курсами
export const dropDownMenuCourses = [
	createCourseLink('Full-Stack', 'Full-Stack', 'Full-Stack', 'full-stack'),
	createCourseLink('Python', 'Python', 'Python', 'python'),
	createCourseLink('Kids', 'Kids', 'Kids', 'kids')
];
export const languages = [
	{ name: 'Русский', value: 'ru' },
	{ name: 'Кыргызча', value: 'kg' },
	{ name: 'English', value: 'en' }
];
