// Базовые объекты ссылок для переиспользования
const links = {
	main: {
		name: 'Главная',
		href: '/'
	},
	questions: {
		name: 'Вопросы',
		href: '/questions'
	},
	myCourses: {
		name: 'Мои курсы',
		href: '/courses'
	},
	myGroups: {
		name: 'Мои группы',
		href: '/groups'
	},
	users: {
		name: 'Пользователи',
		href: '/users'
	},
	contracts: {
		name: 'Контракты',
		href: '/contracts'
	},
	motionAI: {
		name: 'Motion AI',
		href: '/motion-ai'
	},
	profile: {
		name: 'Мой профиль',
		href: '/profile'
	}
};

// Функция для создания ссылок на курсы
const createCourseLink = (name: string, slug: string) => ({
	name,
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
	{ name: 'IT Клуб', href: '/it-club' },
	{ name: 'О руководстве', href: '/management' }
];

// Выпадающее меню с курсами
export const dropDownMenuCourses = [
	createCourseLink('Full-Stack', 'full-stack'),
	createCourseLink('Python', 'python'),
	createCourseLink('Kids', 'kids')
];
