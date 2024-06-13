import type { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { MouseEvent, useEffect, useState, useRef } from "react"
import { SiTelegram } from "react-icons/si"
import { RiArrowDownSLine } from 'react-icons/ri'
import { loadTranslations } from "@/i18n"
import { useTranslation } from "next-i18next"
import Logo from "@/components/Logo"
import SEO from "@/components/SEO"

const DropdownComponent = ({
    title,
    description
}: {
    title: string
    description: string
}) => {
    const [isOpen, setIsOpen]   = useState(false)
    const targetDescription     = useRef<HTMLDivElement>(null)
    const targetQuestion        = useRef<HTMLDivElement>(null)

    const clickQuestion = (e: MouseEvent<HTMLDivElement>) => {
        setIsOpen(!isOpen)
    }

    return (
        <div
            ref={targetQuestion}
            className="question"
            style={
                (isOpen && targetQuestion.current) ? {
                    height: `${targetQuestion.current.scrollHeight}px`
                }: { }
            }
        >
            <div className="title" onClick={clickQuestion}>
                <h4>{title}</h4>
                <RiArrowDownSLine style={
                    isOpen ? {
                        transform: `rotate(180deg)`
                    }: { }
                }/>
            </div>
            <div ref={targetDescription} className="description" dangerouslySetInnerHTML={{__html: description}}/>
        </div>
    )
}

export default () => {

    const router = useRouter()
    const { t } = useTranslation('main')
    const { t: tCommon } = useTranslation('common')

    useEffect(() => {
        const handleHashChange = (url: string) => {
            const hash = url.split('#').pop()
            if (hash) {
                const targetElement = document.getElementById(hash)
                if (targetElement) {
                    document.documentElement.style.scrollBehavior = 'smooth'
                    targetElement.style.scrollMarginTop = '90px'
                }
            }
        }

        router.events.on('hashChangeComplete', handleHashChange)

        return () => {
            router.events.off('hashChangeComplete', handleHashChange)
        }
    }, [])

    return (
        <>
            <SEO
                title={t('title')}
            />
            <div className="aboutWrapper">
                <div className="intro">
                    <div className="title">
                        <div className="logo">
                            <Logo stroke="var(--textPrimaryInvertColor)"/>
                        </div>
                        <h1>
                            {t('intro.serviceName')}
                        </h1>
                    </div>
                    <div className="slogan">
                        <h2>
                            {t('intro.slogan')}
                        </h2>
                    </div>
                </div>
                <div className="details">
                    <p className="description" dangerouslySetInnerHTML={{__html: ''}}/>
                    <div className="links">
                        <a className="button" href={tCommon('usefulLinks.telegramBot')} target="_blank">
                            <SiTelegram/> {t('details.links.telegram')}
                        </a>
                    </div>
                </div>
                <div className="line"></div>
                <div className="advantages sectionWrapper" id="advantages">
                    <h3>{t('advantages.title')}</h3>
                    <p>{t('advantages.description')}</p>
                    <div className="skillsWrapper sectionList">
                        {
                            // @ts-ignore
                            t('advantages.skills', { returnObjects: true }).map((skill, index) => (
                                <div key={index} className="skill sectionItem">
                                    <h4>{skill.title}</h4>
                                    <p>{skill.description}</p>
                                    <img src={skill.image} alt="image"/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="opportunities sectionWrapper" id="opportunities">
                    <h3>{t('opportunities.title')}</h3>
                    <p>{t('opportunities.description')}</p>
                    <div className="featuresWrapper sectionGrid">
                        {
                            // @ts-ignore
                            t('opportunities.features', { returnObjects: true }).map((feature, index) => (
                                <a key={index} href={tCommon('usefulLinks.telegramBot')} target="_blank" className="feature sectionItem">
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </a>
                            ))
                        }
                    </div>
                </div>
                <div className="mechanism sectionWrapper" id="mechanism">
                    <h3>{t('mechanism.title')}</h3>
                    <p>{t('mechanism.description')}</p>
                </div>
                <div className="pricing sectionWrapper" id="pricing">
                    <h3>{t('pricing.title')}</h3>
                    <div className="tariffsWrapper sectionList">
                        {
                            // @ts-ignore
                            t('pricing.tariffs', { returnObjects: true }).map((tariff, index) => (
                                <div key={index} className="tariff sectionItem">
                                    <h4>{tariff.title}</h4>
                                    <p>{tariff.description}</p>
                                    <div className="line"/>
                                    <ul className="featuresList">
                                        {
                                            tariff.features.map((feature: any, index: any) => (
                                                <li key={index} className="feature">{feature}</li>
                                            ))
                                        }
                                    </ul>
                                    <div className="offer">
                                        <p className="price">{tariff.offer.price}</p>
                                        <a className="button" target="_blank" href={tCommon('usefulLinks.telegramBot')}>{tariff.offer.button}</a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="faq sectionWrapper" id="faq">
                    <h3>{t('faq.title')}</h3>
                    <div className="questionsWrapper sectionList">
                        {
                            // @ts-ignore
                            t('faq.questions', { returnObjects: true }).map((question, index) => (
                                <DropdownComponent key={index} title={question.title} description={question.description}/>
                            ))
                        }
                    </div>
                </div>
                <div className="future sectionWrapper">
                    <h3>{t('future.title')}</h3>
                    <p>{t('future.description')}</p>
                    <div className="links">
                        <a className="button" href={tCommon('usefulLinks.telegramBot')} target="_blank">
                            <SiTelegram/> {t('future.buttons.telegram')}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: await loadTranslations(locale || 'ru', ['main'])
    }
}