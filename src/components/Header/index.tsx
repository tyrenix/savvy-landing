import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { IoClose, IoList } from 'react-icons/io5'
import Logo from '../Logo'

export default () => {

    const location = useRouter()

    const { t } = useTranslation('header')
    const { t: tCommon } = useTranslation('common')

    const [isOpen, setIsOpen] = useState(false)
    const [isMini, setIsMini] = useState(location.pathname === '/')

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            setIsMini(location.pathname === '/' && offset <= 300)
        }
      
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [location.pathname])

    const clickMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`headerWrapper ${isOpen ? 'menu': ''} ${isMini ? 'mini': ''}`}>
            <div className="header">
                <Link href='/' className="logo">
                    <div className="img">
                        <Logo stroke="var(--textPrimaryInvertColor)"/>
                    </div>
                    <div className='text'>Savvy</div>
                </Link>
                <div className='links'>
                    <Link href="/#advantages">{t('advantages')}</Link>
                    <Link href="/#opportunities">{t('opportunities')}</Link>
                    <Link href="/#faq">{t('faq')}</Link>
                    <Link href="/#pricing">{t('pricing')}</Link>
                </div>
                <div className="buttons">
                    <a href={tCommon('usefulLinks.telegramBot')} className="button" target='_blank'>{t('buttons.start')}</a>
                </div>
                <div className='menuButton' onClick={clickMenu}>
                    {
                        isOpen ? (<IoClose/>): (<IoList/>)
                    }
                </div>
            </div>
            {/* <div className="line"></div> */}
            <div className="menuContent">
                <div className='links'>
                    <Link href='/#advantages' onClick={clickMenu}>{t('advantages')}</Link>
                    <Link href="/#opportunities" onClick={clickMenu}>{t('opportunities')}</Link>
                    <Link href='/#mechanism' onClick={clickMenu}>{t('mechanism')}</Link>
                    <Link href='/#pricing' onClick={clickMenu}>{t('pricing')}</Link>
                    <Link href="/#faq" onClick={clickMenu}>{t('faq')}</Link>
                    <Link href={tCommon('usefulLinks.helpTelegram')} target='_blank'>{t('help')}</Link>
                </div>
                <div className="buttons">
                    <a href={tCommon('usefulLinks.telegramBot')} className="button" target='_blank'>{t('buttons.start')}</a>
                </div>
            </div>
        </div>
    )
}