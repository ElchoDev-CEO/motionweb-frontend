'use client';
import { FC, ReactNode } from 'react';
import {
	createTheme,
	MantineProvider as MantineProviderOriginal
} from '@mantine/core';

interface IMantineProviderProps {
	children: ReactNode;
}

const theme = createTheme({
	primaryColor: 'red'
});

const MantineProvider: FC<IMantineProviderProps> = ({ children }) => {
	return (
		<MantineProviderOriginal theme={theme}>{children}</MantineProviderOriginal>
	);
};

export default MantineProvider;
