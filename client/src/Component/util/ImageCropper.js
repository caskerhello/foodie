//ImageCropper.js
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

const ImageCropper = ({
    croppedImage,  // crop할 이미지 
    setCroppedAreaPixels, // 이미지 {width: , height: , x: , y: } setstate, 잘린 이미지 값
    width,	// 가로 이미지 비율
    height,	// 세로 이미지 비율
    cropShape = 'none', // 이미지 모양 round 설정 시 원으로 바뀜
}) => {
    const [crop, setCrop] = useState({x: 0, y: 0}); // 중심 좌표
    const [zoom, setZoom] = useState(1); // 확대축소 값

    /* 크롭된 이미지의 픽셀 값을 croppedArea 에 저장 */
    const onCropComplete = (_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    return (
            <div className="cropper">
                <Cropper
                    image={croppedImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={width / height}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape={cropShape}
                />
            </div>
        );
};

export default ImageCropper;
