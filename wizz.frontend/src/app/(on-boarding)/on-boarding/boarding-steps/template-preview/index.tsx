import Image from 'next/image'
import EventWizzLogo from './../../../../../../public/logo/events-logo.png'
import Icons from '@/components/icons'
import TemplateHeader from "./tpl-header"
import TemplateBrand from "./tpl-brand"
import TemplateFeature from "./tpl-feature"
import TemplateEvent from "./tpl-event"
import TemplateDates from "./tpl-dates"
interface HeaderProps {
    logo?: string
    phone?: string
}

interface TemplateProps {
    header?: HeaderProps | null
}


export default function TemplatePreview(templateProps: TemplateProps) {
    const {header} = templateProps;
    const logo = (header && null != header?.logo) ? header?.logo : EventWizzLogo	
    const phone = (header && null != header?.phone) ? header?.phone : 'Phone Number'
    return (
        <>
            <section className="app-wrapper w-full p-4 rounded border">
                <TemplateHeader logo phone />
                <TemplateBrand />
                {/*<TemplateFeature/>*/}
                <TemplateEvent/>
                <TemplateDates/>
            </section>
        </>
    )
}
