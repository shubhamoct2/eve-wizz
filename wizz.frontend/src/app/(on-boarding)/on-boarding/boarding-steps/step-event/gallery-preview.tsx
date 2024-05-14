export default function GalleryPreview({gallery}){
    if(null ===gallery){
        return 
    }
    return (
        <>
            <section className="w-full grid gap-4 grid-cols-4">
                {gallery?.map((image)=>{
                    return (
                        <section className="h-40 p-2 border-2 border-gray-300 border-dashed rounded-lg">
                            <img className="object-cover object-center h-full w-full max-w-full rounded-lg" src={image} alt="preview" />
                       </section>
                    )
                })}
            </section>
            
        </>
    )
}
