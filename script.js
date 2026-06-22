// =====================
// 요소 가져오기
// =====================

const ball = document.getElementById("ball");
const snow = document.getElementById("snow");


// =====================
// 움직임 설정
// =====================

// 위치 (중앙 기준)
let x = 0;
let y = 0;


// 속도
let vx = 0.35;
let vy = 0.25;


// 눈결정 회전 각도
let rotation = 0;


// =====================
// 애니메이션
// =====================

function animate() {


    // 수정구 크기
    const ballSize = ball.offsetWidth;


    // 눈결정 크기
    const snowSize = snow.offsetWidth;


    // 움직일 수 있는 반경
    const limit = (ballSize - snowSize) / 2;


    // 위치 업데이트
    x += vx;
    y += vy;


    // 중심에서 거리
    const distance = Math.sqrt(x * x + y * y);


    // =====================
    // 원형 벽 충돌
    // =====================

    if (distance >= limit) {


        // 법선 벡터
        const nx = x / distance;
        const ny = y / distance;


        // 속도와 법선의 내적
        const dot = vx * nx + vy * ny;


        // 반사 공식
        vx = vx - 2 * dot * nx;
        vy = vy - 2 * dot * ny;


        // 벽 안으로 살짝 이동
        x = nx * (limit - 1);
        y = ny * (limit - 1);
    }


    // 눈결정 회전
    rotation += 0.6;


    // 위치 + 회전 적용
    snow.style.transform =
        `translate(${x}px, ${y}px) rotate(${rotation}deg)`;


    // 다음 프레임
    requestAnimationFrame(animate);
}


// 시작
animate();
