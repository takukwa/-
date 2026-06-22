// =====================
// 요소 가져오기
// =====================

const ball = document.getElementById("ball");
const mover = document.getElementById("mover");
const snow = document.getElementById("snow");


// =====================
// 위치와 속도
// =====================

let x = 0;
let y = 0;


// 시작 방향 (조금 랜덤)
let speed = 0.9;
let direction = Math.random() * Math.PI * 2;

let vx = Math.cos(direction) * speed;
let vy = Math.sin(direction) * speed;


// 눈 결정 회전
let angle = 0;


// =====================
// 애니메이션
// =====================

function animate() {


    // 크기 계산
    const ballRadius =
        ball.getBoundingClientRect().width / 2;

    const snowRadius =
        snow.getBoundingClientRect().width / 2;


    // 이동 가능한 범위
    const limit =
        ballRadius - snowRadius - 3;


    // 이동
    x += vx;
    y += vy;


    // 현재 중심에서 거리
    const distance = Math.hypot(x, y);


    // =====================
    // 벽 충돌
    // =====================

    if (distance >= limit) {


        // 충돌 지점 방향
        const nx = x / distance;
        const ny = y / distance;


        // 수정구 안으로 위치 보정
        x = nx * (limit - 1);
        y = ny * (limit - 1);


        // 거울 반사
        const dot = vx * nx + vy * ny;

        vx = vx - 2 * dot * nx;
        vy = vy - 2 * dot * ny;


        // -----------------
        // 마법 같은 흔들림 추가 ✨
        // -----------------

        // 현재 속도 방향
        let angleDirection = Math.atan2(vy, vx);


        // -60도 ~ +60도 랜덤 변화
        angleDirection +=
            (Math.random() - 0.5)
            * (Math.PI / 3);


        // 다시 속도로 변환
        vx = Math.cos(angleDirection) * speed;
        vy = Math.sin(angleDirection) * speed;

    }


    // =====================
    // 수정구 내부 이동
    // =====================

    mover.style.transform =
        `translate(${x}px, ${y}px)`;


    // =====================
    // 눈 결정 회전
    // =====================

    angle += 0.5;


    snow.style.transform =
        `rotate(${angle}deg)`;


    requestAnimationFrame(animate);

}


// 시작
animate();
