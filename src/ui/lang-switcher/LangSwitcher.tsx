'use client';
import { FC, useEffect, useRef } from 'react';

interface IProps {
	onClose: () => void;
	isOpen: boolean;
	children: React.ReactNode;
}
const LangSwitcher: FC<IProps> = ({ isOpen, onClose, children }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);
	if (!isOpen) return null;

	return (
		<div
			className="modal-overlay"
			ref={modalRef}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="modal-content" ref={modalRef}>
				{children}
			</div>
		</div>
	);
};

export default LangSwitcher;
