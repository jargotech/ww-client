import React from 'react'
import Image from 'next/image'
import UploadIcon from '../../../../public/upload-icon.svg'

export default function UploadInput() {
    return (
        <div>
            <div className="upload-file-container">
                <input className="uploadfile" type="file" />
                <div className="upload-file-logo">
                    <Image src={UploadIcon} alt="Upload" height={40} width={40} />
                    <p>Browse to upload</p>
                </div>
                <div className="select-file">
                    <span>Select a file</span> or drag in form
                </div>
            </div>

        </div>
    )
}
