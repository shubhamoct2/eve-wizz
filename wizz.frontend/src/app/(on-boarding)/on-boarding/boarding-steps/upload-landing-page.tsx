import {useState, useEffect} from 'react';

import {useDropzone} from 'react-dropzone';
import {Input} from '@/components/ui/input'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
//    display: 'inline-flex',
//    borderRadius: 2,
//    border: '1px solid #eaeaea',
//    marginBottom: 8,
//    marginRight: 8,
//    width: 100,
//    height: 100,
//    padding: 4,
//    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};
export default function UploadLandingPage() {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                    }}
                />
            </div>
        </div>
    ));
    return (
        <>
            <section className="w-full border rounded p-8 flex items-center justify-center flex-col">
                <div {...getRootProps({className: 'dropzone'})}>
                    <Input type={'file'} {...getInputProps()}/>
                    <p className={"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"}>
                        Upload Image
                    </p>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
            </section>
        </>
    )
}