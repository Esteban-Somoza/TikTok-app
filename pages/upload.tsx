import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete, MdWrongLocation } from 'react-icons/md'
import axios from 'axios'
import useAuthStore from 'store/authStore'
import { client } from 'utils/client'
import { SanityAssetDocument } from '@sanity/client'

function Upload() {
    const [isLoading, setIsLoading] = useState(false)
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);

    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0]
        const fileTyes = ['video/mp4', 'video/webm', 'video/ogg']

        if (fileTyes.includes(selectedFile.type)) {
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            }).then((data) => {
                setIsLoading(false)
                setVideoAsset(data)
            })
        }

        else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    }

    return (
        <div className='flex w-full h-full'>
            <div className='bg-white rounded-lg'>
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                    </div>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 
                    flex flex-col justify-center items-center outline-none mt-10 
                    w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
                        {isLoading ? (
                            <p>Uploading...</p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <div>
                                            <video src={videoAsset.url}
                                            controls
                                            loop className='rounded-xl h-[450px] mt-16 bg-black'>
                                            </video>
                                        </div>
                                    </div>
                                ) : (
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <p className='font-bold text-xl'>
                                                    <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                                </p>
                                                <p className='text-xl font-semibold '>
                                                    Upload Video
                                                </p>
                                            </div>
                                            <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                                MP4 or WebM or ogg <br />
                                                720x1280px or higher <br />
                                                Pp to 10 minutes <br />
                                                Less than 2GB
                                            </p>
                                            <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                                Select File
                                            </p>
                                            <input type="file" name='upload-video' className='2-0 h-0' onChange={uploadVideo} />
                                        </div>
                                    </label>
                                )}
                            </div>
                        )}
                        {wrongFileType ? (
                            <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>Please select a video file</p>
                        ):(
                            // 2:47:36
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload