/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */

/**
 * Base64 또는 이미지 URL을 받아 HTMLImageElement를 생성하는 함수
 */
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // CORS 문제를 방지
        image.src = url;
    });

/**
 * 크롭된 이미지를 캔버스를 통해 생성하고 Base64 형식으로 반환
 * @param {string} imageSrc - 크롭할 이미지의 URL (Base64 또는 외부 이미지 URL)
 * @param {Object} pixelCrop - 크롭 영역 정보 (x, y, width, height)
 * @param {number} rotation - 회전 각도 (기본값: 0)
 * @param {Object} flip - 이미지 플립 설정 (horizontal, vertical, 기본값: {horizontal: false, vertical: false})
 * @returns {string} - Base64 형식의 크롭된 이미지
 */
export default async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
) {
    const image = await createImage(imageSrc); // 이미지 객체 생성
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return null;
    }

    const rotRad = (rotation * Math.PI) / 180; // 회전 각도를 라디안으로 변환

    // 회전된 이미지의 바운딩 박스 크기 계산
    const bBoxWidth =
        Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height);
    const bBoxHeight =
        Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height);

    // 캔버스 크기를 회전된 이미지 크기에 맞춤
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // 캔버스를 회전 중심으로 이동 후 이미지 회전/플립
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // 이미지를 캔버스에 그림
    ctx.drawImage(image, 0, 0);

    // 크롭 영역 데이터 추출
    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    // 캔버스 크기를 크롭 영역에 맞게 설정 (이전 컨텍스트 삭제됨)
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // 크롭된 이미지를 캔버스에 붙여넣기
    ctx.putImageData(data, 0, 0);

    // Base64 형식으로 반환
    return canvas.toDataURL('image/png');
}