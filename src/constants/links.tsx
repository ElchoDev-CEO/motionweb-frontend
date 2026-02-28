// Базовые объекты ссылок для переиспользования
const links = {
	main: {
		name: 'Главная',
		nameEn: 'Main',
		href: '/'
	},
	questions: {
		name: 'Вопросы',
		nameEn: 'Questions',
		href: '/questions'
	},
	myCourses: {
		name: 'Мои курсы',
		nameEn: 'My courses',
		href: '/courses'
	},
	myGroups: {
		name: 'Мои группы',
		nameEn: 'My groups',
		href: '/groups'
	},
	users: {
		name: 'Пользователи',
		nameEn: 'Users',
		href: '/users'
	},
	contracts: {
		name: 'Контракты',
		nameEn: 'Contacts',
		href: '/contracts'
	},
	motionAI: {
		name: 'Motion AI',
		nameEn: 'Motion AI',
		href: '/motion-ai'
	},
	profile: {
		name: 'Мой профиль',
		nameEn: 'My profile',
		href: '/profile'
	}
};

const extraLinks = {
	python: {
		name: 'Python для всех',
		nameEn: 'Python for everyone',
		href: '/our-courses/python'
	},
	fullstack: {
		name: 'Fullstack курс',
		nameEn: 'Fullstack course',
		href: '/our-courses/full-stack'
	},
	kids: {
		name: 'IT для детей',
		nameEn: 'IT for kids',
		href: 'our-courses/kids'
	}
};

// Функция для создания ссылок на курсы
const createCourseLink = (name: string, nameEn: string, slug: string) => ({
	name,
	nameEn,
	href: `/our-courses/${slug}`
});

// Главное меню для обычных пользователей
export const siteLinks = [
	links.main,
	links.questions,
	links.myCourses,
	links.myGroups,
	links.users
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
	createCourseLink('Full-Stack', 'Full-Stack', 'full-stack'),
	createCourseLink('Python', 'Python', 'python'),
	createCourseLink('Kids', 'Kids', 'kids')
];
