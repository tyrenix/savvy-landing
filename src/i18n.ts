import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const loadTranslations = async (locale: string, namespacesRequired: string[]) => {
    return {
        ...(await serverSideTranslations(locale, [...namespacesRequired, 'common', 'header', 'footer']))
    }
}  