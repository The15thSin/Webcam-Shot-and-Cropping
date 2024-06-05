import './Landing.css'
import WebcamCapture from 'react-webcam';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [finalImage, setFinalImage] = useState(null);

    const capturePhoto = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const handleDoneClick = () => {
        setFinalImage(capturedImage);
        navigate('/crop', { state: { image: capturedImage } });
    }

    return (
        <>
            <h1 style={{ textAlign: "center" , marginTop: "2rem"}}>Webcam Image Capture</h1>
            <div className='Landing'>
                <span className='webcam-span'>
                    <div className='landing-webcam'>
                        <p>
                            <img width="24" height="24" src="https://img.icons8.com/ios-filled/36/ff0000/camera--v3.png" alt="camera--v3" />
                            Webcam
                        </p>
                        <WebcamCapture
                            audio={false}
                            width={400}
                            height={400}
                            ref={webcamRef}
                        />
                    </div>
                    <div className="capture-btn">
                        <button onClick={capturePhoto}>
                            {
                                (capturedImage) ?
                                    <p>Retake</p>
                                    :
                                    <p>Capture Photo</p>
                            }
                        </button>
                    </div>
                </span>
                {
                    capturedImage && (
                        <>
                            <span style={{ border: "1px solid black", height: "80vh" }}>
                            </span>
                            <span className='captured-span'>
                                <div className="captured-image">
                                    <img src={capturedImage} alt="Captured Photo" />
                                </div>
                                <div className="final-btn">
                                    <button onClick={handleDoneClick}>
                                        Done
                                    </button>
                                </div>
                            </span>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Landing
