const features = [
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                 className="lucide lucide-map-pin h-10 w-10">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
            </svg>,
        title: "Location",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                 className="lucide lucide-arrow-big-down-dash h-10 w-10">
                <path d="M15 5H9"/>
                <path d="M15 9v3h4l-7 7-7-7h4V9z"/>
            </svg>,
        title: "Downloads",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                 className="lucide lucide-award h-10 w-10">
                <path
                    d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
                <circle cx="12" cy="8" r="6"/>
            </svg>,
        title: "Pricing",
        desc: "Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    },
]
export default function TemplateDates() {
    return (
        <section className="max-w-screen-xl mx-auto px-4 py-4 gap-12 text-gray-600 md:px-8">
            <section className="w-full my-3">
                <h2 className="text-4xl px-12 text-gray-800 font-extrabold mx-auto md:text-3xl text-center">
                    Check out the latest dates to be released, But get in quick as these dates will soon will go!!
                </h2>
            </section>
            <div className="mt-12">
                <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        features.map((item, idx) => (
                            <li key={idx} className="space-y-3 p-4 bg-gray-200 rounded-sm">
                                <div
                                    className="w-12 h-12 mx-auto bg-grey-100 text-grey-600 rounded-full flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h4 className="text-lg text-center text-gray-800 font-semibold">
                                    {item.title}
                                </h4>
                                <p className="text-center">
                                    {item.desc}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>

    )
}
