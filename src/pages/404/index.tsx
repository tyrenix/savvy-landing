import type { GetStaticProps } from 'next'
import { loadTranslations } from '@/i18n'
import { useTranslation } from 'next-i18next'
import styles from './index.module.css'
import SEO from '@/components/SEO'

const NotFound = () => {

    const { t } = useTranslation('404')

    return (
        <>
            <SEO
                title={t('title')}
                description={t('title')}
            />
            <div className={styles.errorWrapper}>
                <h1 className={styles.h1}>404</h1>
                <div className={styles.line}/>
                <p className={styles.p}>{t('title')}</p>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: await loadTranslations(locale || 'ru', ['404'])
    }
}

export default NotFound