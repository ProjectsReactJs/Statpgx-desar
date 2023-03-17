import { useMemo } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { NextComponentType, NextPageContext } from 'next/types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import defaultTheme from '@src/theme';
import { enUS as gridEnUs, esES as gridEsEs } from '@mui/x-data-grid';
import { enUS as coreEnUS, esES as coreEsES } from '@mui/material/locale';
import AuthenticatedPage, { AuthProps } from '@src/components/main/AuthenticatedPage';
import Page from '@src/components/main/Page';
import 'survey-core/defaultV2.min.css';
import '@src/default.css';

export const DataGridMaterialUILocales = {
	en: gridEnUs,
	es: gridEsEs,
};

export const MaterialUILocales = {
	en: coreEnUS,
	es: coreEsES,
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type ComponentProps = NextComponentType<NextPageContext, any, {}> & {
	auth: AuthProps;
};

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
	Component: any;
}

function MyApp(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps: { session, ...pageProps },
	} = props;
	const { i18n } = useTranslation();
	const { language } = i18n;
	const themeWithLocale = useMemo(
		() =>
			createTheme(
				defaultTheme,
				MaterialUILocales[language as keyof typeof MaterialUILocales],
				DataGridMaterialUILocales[language as keyof typeof DataGridMaterialUILocales]
			),
		[language, defaultTheme]
	);

	return (
		<SessionProvider session={session} refetchInterval={900}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={themeWithLocale}>
					<CssBaseline />
					<Page>
						<Component {...pageProps} />
					</Page>
				</ThemeProvider>
			</CacheProvider>
		</SessionProvider>
	);
}

export default appWithTranslation(MyApp);
