import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import styles from './index.module.css'

export default () => {

    const { t } = useTranslation('footer')
    const { t: tCommon } = useTranslation('common')

    return (
        <div className={styles.footerWrapper}>
            <div className={styles.line}></div>
            <div className={styles.footer}>
                <div className={styles.links}>
                    <Link className={styles.a} href='/#advantages'>{t('advantages')}</Link>
                    <Link className={styles.a} href='/#opportunities'>{t('opportunities')}</Link>
                    <Link className={styles.a} href='/#mechanism'>{t('mechanism')}</Link>
                    <Link className={styles.a} href='/#pricing'>{t('pricing')}</Link>
                    <Link className={styles.a} href='/#faq'>{t('faq')}</Link>
                    <a className={styles.a} href={tCommon('usefulLinks.helpTelegram')} target='_blank'>{t('help')}</a>
                </div>
            </div>
            <div className={styles.copy}>
                &copy; 2024 Savvy.
            </div>
        </div>
    )
}