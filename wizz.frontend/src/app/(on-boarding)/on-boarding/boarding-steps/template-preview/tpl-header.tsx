import Image from 'next/image'
import Icons from '@/components/icons'

interface HeaderProps{
    logo?:string
    phone?:string|number
}
export default function TemplateHeader({logo,phone}:HeaderProps){
    return (
        <header className="app-header">
            <section className="flex w-full justify-between">
                <section className="sdfs">
                    <span className="lo">Browse Events</span>
                </section>
                <section className="logo">
                    <Image
                        src={logo}
                        width={100}
                        height={60}
                        alt="EventWizz Logo"
                    />
                </section>
                <section className={"list-items"}>
                    <ul className="flex items-center justify-between space-x-2">
                        <li className="flex items-center space-x-2">
                        <span>
                            <Icons.phone height={16} width={16}/>
                        </span>
                            <span className="text-sm">
                                {phone}
                        </span>
                        </li>
                    </ul>
                </section>
            </section>
        </header>	
    )
}
