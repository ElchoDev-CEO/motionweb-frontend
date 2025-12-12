'use client';
import { FC } from 'react';
import scss from './OurOwners.module.scss';
import Image from 'next/image';
import { IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';
import { FaTiktok } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { IconOurOwners } from '@/assets/icons';
import {
	dastan_mukeev,
	kanat_askerov,
	kurmanbek_hooshbaev
} from '@/assets/img/founders';

const founders_data = [
	{
		name: 'Жоошбаев Курманбек',
		photo: kurmanbek_hooshbaev,
		role: 'Один из основателей академии Motion Web',
		details: [
			"В 2024 году он создал ОсОО 'Motion', брокерскую компанию",
			'С 2011 года работает в финансовой сфере'
		],
		contacts: [
			{
				icon: <FaTiktok />,
				link: 'https://www.tiktok.com/@kurmanbek.zhooshbaev'
			},
			{
				icon: <AiFillInstagram />,
				link: 'https://www.instagram.com/kurmanbek.zhooshbaev'
			}
		]
	},
	{
		name: 'Аскеров Канатбек',
		photo: kanat_askerov,
		role: 'Один из основателей академии Motion Web',
		details: [
			"В 2023 году стал одним из основателей ААК 'Motion Group'",
			'В 2022 году сотрудничал с принцем Дубая',
			'В 2020 году совместно с партнерами основал первую кыргызоязычную IT-академию',
			'Имеет 8-летний опыт в IT-сфере'
		],
		contacts: [
			{
				icon: <FaTiktok />,
				link: 'https://www.tiktok.com/@askerov_kanatbek1'
			},
			{
				icon: <AiFillInstagram />,
				link: 'https://www.instagram.com/askerov_kanatbek'
			}
		]
	},
	{
		name: 'Мукеев Дастан',
		photo: dastan_mukeev,
		role: 'Один из основателей компании Motion Web',
		details: [
			'В 2024 году выводит IT-продукцию на рынок Кыргызстана',
			'В 2022 году сотрудничал с принцем Дубая',
			'В 2021 году основал IT-студию Motion Web',
			'Сотрудничает с 7 странами в разработке и обслуживании IT-продуктов'
		],
		contacts: [
			{
				icon: <FaTiktok />,
				link: 'https://www.tiktok.com/@dastan.mukeev'
			},
			{
				icon: <AiFillInstagram />,
				link: 'https://www.instagram.com/dastan.mukeev'
			}
		]
	}
];

const OurOwners: FC = () => {
	return (
		<section className={scss.OurOwners}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconOurOwners />
						<h1 className={scss.title}>
							<span>О руководстве</span>
						</h1>
					</div>
					<div className={scss.cards}>
						{founders_data.map((item, index) => (
							<div key={index} className={scss.card_wrapper}>
								<div className={scss.card}>
									<div className={scss.top}>
										<div className={scss.photo}>
											<Image
												src={item.photo}
												alt={item.name}
												width={293}
												height={201}
											/>
										</div>
										<div className={scss.contacts}>
											{item.contacts.map((item, index) => (
												<a
													key={index}
													className={scss.link}
													href={item.link}
													target="_blank"
												>
													{item.icon}
												</a>
											))}
										</div>
									</div>
									<div className={scss.bottom}>
										<h2 className={scss.name}>{item.name}</h2>
										<p className={scss.role}>{item.role}</p>
										<ul className={scss.details}>
											{item.details.map((text, index) => (
												<li key={index} className={scss.li}>
													{text}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurOwners;
