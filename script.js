// =====================
// 요소 가져오기
// =====================

const ball = document.getElementById("ball");
const snow = document.getElementById("snow");


// =====================
// 위치와 속도
// =====================

// 수정구 중심 기준 위치
let x = 0;
let y = 0;


// 움직임 속도
let vx = 0.7;
let vy = 0.45;


// 눈결정 회전
let angle = 0;


// =====================
// 애니메이션
// =====================

function animate() {


    // 현재 수정구와 눈 크기
    const ballRadius = ball.offsetWidth / 2;
    const snowRadius = snow.offsetWidth / 2;


    // 눈결정이 움직일 수 있는 최대 거리
    const limit = ballRadius - snowRadius - 3;


    // 위치 이동
    x += vx;
    y += vy;


    // 중심에서의 거리
    const distance = Math.sqrt(x * x + y * y);


    // =====================
    // 원형 벽 충돌
    // =====================

    if (distance >= limit) {


        // 충돌한 벽의 방향(법선 벡터)
        const nx = x / distance;
        const ny = y / distance;


        // 속도가 벽 방향으로 얼마나 가는지 계산
        const dot = vx * nx + vy * ny;


        // 반사 공식
        vx = vx - (2 * dot * nx);
        vy = vy - (2 * dot * ny);


        // 눈이 벽 밖으로 나가지 않게 보정
        x = nx * (limit - 1);
        y = ny * (limit - 1);

    }


    // 눈 결정 자체 회전
    angle += 0.6;


    // 위치 적용
    snow.style.transform =
        `
        translate(-50%, -50%)
        translate(${x}px, ${y}px)
        rotate(${angle}deg)
        `;


    // 다음 프레임
    requestAnimationFrame(animate);

}


// 시작
animate();
