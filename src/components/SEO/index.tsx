import Head from 'next/head'
import { useTranslation } from 'next-i18next'

type PropsTypes = {
    title?: string
    description?: string
}

export default (props: PropsTypes) => {

    const { t } = useTranslation('common')

    const title = props.title ? `${t('title')} | ${props.title}`: t('title')

    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" href="/logo192.png"/>
            <meta name="description" content={props.description || t('description')}/>
            {/* Open Graph */}
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={props.description || t('description')}/>
            <meta property="og:image" content="/logo512.png"/>
            <meta property="og:type" content="website"/>
        </Head>
    )
}