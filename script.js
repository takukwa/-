// =====================
// 요소 가져오기
// =====================

const ball = document.getElementById("ball");
const mover = document.getElementById("mover");
const snow = document.getElementById("snow");


// =====================
// 위치와 속도
// =====================

// 수정구 중심 기준 위치
let x = 0;
let y = 0;


// 이동 속도
let vx = 0.8;
let vy = 0.55;


// 회전 각도
let angle = 0;


// =====================
// 애니메이션
// =====================

function animate() {


    // 수정구 반지름
    const ballRadius =
        ball.getBoundingClientRect().width / 2;


    // 눈결정 반지름
    const snowRadius =
        snow.getBoundingClientRect().width / 2;


    // 눈결정 중심이 갈 수 있는 최대 거리
    const limit =
        ballRadius - snowRadius - 2;


    // 다음 위치 계산
    x += vx;
    y += vy;


    // 수정구 중심에서 거리
    const distance = Math.hypot(x, y);


    // =====================
    // 수정구 벽 충돌
    // =====================

    if (distance >= limit) {


        // 벽 방향 벡터
        const nx = x / distance;
        const ny = y / distance;


        // 벽 안쪽으로 위치 보정
        x = nx * (limit - 1);
        y = ny * (limit - 1);


        // 속도 반사
        const dot = vx * nx + vy * ny;

        vx = vx - 2 * dot * nx;
        vy = vy - 2 * dot * ny;


        // ✨ 약간의 랜덤한 흔들림 추가
        vx += (Math.random() - 0.5) * 0.4;
        vy += (Math.random() - 0.5) * 0.4;


        // 속도가 너무 빨라지거나 느려지지 않게 보정
        const speed = Math.hypot(vx, vy);
        const targetSpeed = 1;
        
        vx = (vx / speed) * targetSpeed;
        vy = (vy / speed) * targetSpeed;
    }


    // =====================
    // 위치 적용
    // =====================

    mover.style.transform =
        `translate(${x}px, ${y}px)`;


    // =====================
    // 눈 자체 회전
    // =====================

    angle += 0.5;


    snow.style.transform =
        `rotate(${angle}deg)`;


    // 다음 프레임
    requestAnimationFrame(animate);
}


// 시작
animate();
