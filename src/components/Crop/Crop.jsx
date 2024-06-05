import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'

import './Crop.css'

function Crop() {

    const location = useLocation();

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    
    // const image = 'https://picsum.photos/id/64/600/400'
    const image = location.state.image
    // console.log(image)

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const saveCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className='Crop'>
            <div className='cropper-container'>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={92 / 118}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onRotationChange={setRotation}
                    onZoomChange={setZoom}
                    showGrid={false}
                />
            </div>
            <div className='cropper-controls'>
                <span>
                    <label htmlFor="zoom-slider">Zoom :</label>
                    <input
                        id="zoom-slider"
                        type="range"
                        min={1}
                        max={3}
                        value={zoom}
                        step={0.01}
                        onChange={(e) => setZoom(e.target.value)}
                    />
                    <button onClick={() => setZoom(1)}>Reset</button>
                </span>
                <span>
                    <label htmlFor="rotate-slider">Rotate :</label>
                    <input
                        id="rotate-slider"
                        type="range"
                        min={-180}
                        max={180}
                        value={rotation}
                        step={0.5}
                        onChange={(e) => setRotation(e.target.value)}
                    />
                    <button onClick={() => setRotation(0)}>Reset</button>
                </span>
                <span>
                    <button
                        className='save-button'
                        onClick={saveCroppedImage}
                    >
                        Save        
                    </button>
                </span>
            </div>

            <div className='saved-image'>
                {
                    (croppedImage) && (
                        <img src={croppedImage} alt="cropped" />
                    )
                }
            </div>
        </div>
    )
}

export default Crop
