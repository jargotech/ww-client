import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import UploadIcon from '../../../../public/upload-icon.svg'

export default function UploadInput() {

    // State
    const [images, setImages] = useState<any[]>([]);
    const [previewImages, setPreviewImages] = useState<any[]>([]);

    // Functions
    const handleImageChange = (event: any) => {
        const files = event.target.files;
        console.log(files);
        let tempFiles: any[] = [];
        if (files && files[0]) {
            console.log(files);

            var reader = new FileReader();
            reader.onload = function (e: any) {
                // setImages([e.target.result])
                setPreviewImages([e.target.result])
                // tempFiles.push(e.target.result)
            }
            // files.forEach((element: any) => {
            reader.readAsDataURL(files[0]);
            // });
        }
        setTimeout(() => {
            setPreviewImages(tempFiles);
        }, 300);

    }
    return (
        <div>
            {/* {JSON.stringify(images)} */}
            <div className="upload-file-container">
                <input className="uploadfile" type="file" multiple accept="image/png, image/gif, image/jpeg, image/svg" onChange={(e) => handleImageChange(e)} />
                <div className="upload-file-logo">
                    <Image src={UploadIcon} alt="Upload" height={40} width={40} />
                    <p>Browse to upload</p>
                </div>
                <div className="select-file">
                    <span>Select a file</span> or drag in form
                </div>
            </div>
            <div className="preview">
                <ul>
                    {previewImages && previewImages.map((image, index) => (
                        <li key={index}>
                            <Image src={image} alt="Upload" width={100} height={80} />
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}
