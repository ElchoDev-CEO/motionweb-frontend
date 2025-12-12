'use client';
import { FC, useEffect, useRef } from 'react';
import scss from './DropDownMenu.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChevronDown } from '@tabler/icons-react';
import { useHeaderStore } from '@/stores/useHeaderStore';

interface DropDownMenuProps {
	title: string;
	links: { name: string; href: string }[];
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const DropDownMenu: FC<DropDownMenuProps> = ({
	title,
	links,
	isOpen,
	setIsOpen
}) => {
	const pathname = usePathname();
	const { setIsOpen: setIsOpenBurgerMenu } = useHeaderStore();
	const menuRef = useRef<HTMLDivElement>(null);

	const isActive = isOpen || links.some((link) => pathname.includes(link.href));

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setIsOpen]);

	return (
		<div
			ref={menuRef}
			className={scss.DropDownMenu}
			onClick={(e) => e.stopPropagation()}
		>
			<div className={scss.container}>
				<div className={scss.content}>
					<button className={scss.button} onClick={() => setIsOpen(!isOpen)}>
						<span
							className={
								isActive ? `${scss.text} ${scss.active}` : `${scss.text}`
							}
						>
							{title || 'Нет названия'}
						</span>
						<span
							className={
								isActive ? `${scss.icon} ${scss.active}` : `${scss.icon}`
							}
							style={{
								transform:
									links.map((link) => link.href).includes(pathname) && !isOpen
										? 'rotate(-360deg)'
										: ''
							}}
						>
							<IconChevronDown size={18} />
						</span>
					</button>
					<div
						className={isOpen ? `${scss.menu} ${scss.active}` : `${scss.menu}`}
					>
						<h1 className={scss.title}>{title || 'Нет названия'}</h1>
						<nav className={scss.nav}>
							<ul className={scss.ul}>
								{links.map((item, index) => (
									<li key={index} className={scss.li}>
										<Link
											href={item.href}
											className={
												pathname === item.href
													? `${scss.link} ${scss.active}`
													: `${scss.link}`
											}
											onClick={() => {
												setIsOpen(false);
												setIsOpenBurgerMenu(false);
											}}
										>
											<span
												className={
													pathname === item.href
														? `${scss.text} ${scss.active}`
														: `${scss.text}`
												}
											>
												{item.name}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DropDownMenu;
