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
import { useTranslation } from 'react-i18next';

const founders_data = [
	{
		name: 'Жоошбаев Курманбек',
		nameEn: 'Zhooshbaev Kurmanbek',
		photo: kurmanbek_hooshbaev,
		role: 'Один из основателей академии Motion Web',
		roleKg: 'Академиянын негиздөөчүлөрүнүн бири',
		roleEn: 'One of the founders of the Motion Web Academy',
		details: [
			"В 2024 году он создал ОсОО 'Motion', брокерскую компанию",
			'С 2011 года работает в финансовой сфере'
		],
		detailsKg: [
			'2024 - жылы ал ОсОО "Motion" брокердик компаниясын түзгөн',
			'2011-жылдан бери каржы тармагында иштейт'
		],
		detailsEn: [
			"In 2024, he founded the OSOO 'Motion', a brokerage company",
			'Has been working in the financial sector since 2011'
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
		nameEn: 'Askerov Kanatbek',
		photo: kanat_askerov,
		role: 'Один из основателей академии Motion Web',
		roleKg: 'Академиянын негиздөөчүлөрүнүн бири',
		roleEn: 'One of the founders of the Motion Web Academy',
		details: [
			"В 2023 году стал одним из основателей ААК 'Motion Group'",
			'В 2022 году сотрудничал с принцем Дубая',
			'В 2020 году совместно с партнерами основал первую кыргызоязычную IT-академию',
			'Имеет 8-летний опыт в IT-сфере'
		],
		detailsKg: [
			"2023-жылы ААК 'Motion Group' негиздөөчүлөрүнүн бири болгон",
			'2022-жылы Дубай ханзаадасы менен кызматташкан',
			'2020-жылы өнөктөштөр менен биргеликте биринчи кыргыз тилдүү дил-академияны негиздеген',
			'Ички чөйрөдө 8 жылдык тажрыйбасы бар'
		],
		detailsEn: [
			"In 2023, he became one of the founders of AAK 'Motion Group'",
			'In 2022, he collaborated with the Prince of Dubai',
			'In 2020, he and his partners founded the first Kyrgyz-language IT academy.',
			'He has 8 years of experience in the IT field.'
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
		nameEn: 'Mukeev Dastan',
		photo: dastan_mukeev,
		role: 'Один из основателей компании Motion Web',
		roleKg: 'Академиянын негиздөөчүлөрүнүн бири',
		roleEn: 'One of the founders of the Motion Web Academy',
		details: [
			'В 2024 году выводит IT-продукцию на рынок Кыргызстана',
			'В 2022 году сотрудничал с принцем Дубая',
			'В 2021 году основал IT-студию Motion Web',
			'Сотрудничает с 7 странами в разработке и обслуживании IT-продуктов'
		],
		detailsKg: [
			'2024-жылы Кыргызстандын рыногуна өз продукциясын киргизген',
			'2022-жылы Дубайдын ханзаадасы менен кызматташкан',
			'2021-жылдын IT-студиясы Motion Web долбоору ишке киргизген',
			'7 мамлекет менен кызматташуу жана аны өнүктүрүү жана тейлөө'
		],
		detailsEn: [
			'Introduced IT products to the Kyrgyz market in 2024',
			'Collaborated with the Prince of Dubai in 2022',
			'Founded the Motion Web IT studio in 2021',
			'Collaborates with 7 countries in the development and maintenance of IT products'
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
	const { i18n, t } = useTranslation('');
	return (
		<section className={scss.OurOwners}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconOurOwners />
						<h1 className={scss.title}>
							<span>
								{i18n.language === 'en'
									? 'About the guide'
									: i18n.language === 'ru'
										? 'О руководстве'
										: 'Жетекчилик жөнүндө'}
							</span>
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
										<h2 className={scss.name}>
											{i18n.language === 'en' ? item.nameEn : item.name}
										</h2>
										<p className={scss.role}>
											{i18n.language === 'en'
												? item.roleEn
												: i18n.language === 'ru'
													? item.role
													: item.roleKg}
										</p>
										<ul className={scss.details}>
											{(i18n.language === 'en'
												? item.detailsEn
												: i18n.language === 'ru'
													? item.details
													: item.detailsKg
											).map((text, index) => (
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
