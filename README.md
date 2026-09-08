# GrowthLog Lounge Space Guide

Growth Lounge를 처음 방문한 외부 대여 이용자가 하나의 QR로 Welcome, Quick Guide, Wi-Fi, TV 연결, 화장실, 쓰레기 배출, 퇴실 체크리스트, CCTV와 문의 안내를 확인하는 모바일 우선 정적 웹사이트입니다.

## 파일 구조

```text
/
├── index.html          # 화면의 문구와 메뉴/상세 영역
├── css/style.css       # 색상, 레이아웃, 모바일/데스크톱 스타일
├── js/app.js           # 화면 전환, 복사, 체크리스트, 이미지 확대
└── images/             # 현장 안내 원본 이미지 7종
```

## 로컬 실행 방법

가장 간단한 확인 방법은 `index.html`을 브라우저에서 여는 것입니다. Clipboard 기능까지 배포 환경과 가깝게 확인하려면 프로젝트 폴더에서 로컬 서버를 실행하세요.

```powershell
py -m http.server 8000
```

Python이 설치되어 있지 않다면 VS Code의 Live Server 같은 정적 웹 서버를 사용해도 됩니다.

브라우저에서 `http://localhost:8000`을 엽니다.

## 운영자가 수정하는 방법

### 문구 수정

`index.html`에서 화면에 보이는 한글 문구를 검색해 수정합니다. HTML 태그(`<`, `>`)는 지우지 않도록 주의하세요.

### Wi-Fi 변경

1. `index.html`의 `Network`, `Password` 표시값을 변경합니다.
2. `js/app.js`의 `const password = 'growth1703-2!';` 값도 같은 비밀번호로 변경합니다.

### 이미지 교체

`images` 폴더에서 기존 파일과 **동일한 파일명**으로 새 PNG를 덮어쓰면 코드 수정 없이 반영됩니다. 이미지 비율은 자동으로 유지됩니다.

- `01_welcome.png`: Welcome / Main Guide
- `02_quick_guide.png`: 한눈에 보는 이용 가이드
- `03_checkout.png`: 퇴실 체크리스트
- `04_restroom.png`: 화장실 안내
- `05_tv_guide.png`: TV / 디스플레이 연결 상세 안내
- `06_cctv.png`: CCTV 촬영 안내
- `07_waste_guide.png`: 비품 위치와 쓰레기 배출 안내

브라우저가 이전 이미지를 보여주면 새로고침하거나 캐시를 비운 뒤 확인하세요.

### TV / Waste Guide 변경

- TV 상세 안내는 `images/05_tv_guide.png`를 동일한 파일명으로 교체합니다.
- 쓰레기 배출 안내는 `images/07_waste_guide.png`를 동일한 파일명으로 교체합니다.
- 화면의 요약 문구는 `index.html`의 `<section id="tv">`와 `<section id="waste">`에서 수정합니다.

### 관리자 연락처 추가

현재 문의 채널은 카카오채널 `Growth Lounge`입니다. 공식 채널 URL이 확정되면 `index.html`의 `help-card` 영역에 링크를 추가하세요. 전화번호나 이메일은 확정 전까지 추가하지 않습니다.

## GitHub Pages 배포 방법

1. GitHub에 새 repository를 만들고 이 폴더의 파일을 업로드합니다.
2. repository의 **Settings → Pages**로 이동합니다.
3. **Build and deployment**에서 **Deploy from a branch**를 선택합니다.
4. 배포 branch(보통 `main`)와 `/(root)`를 선택하고 저장합니다.
5. 표시된 `https://{username}.github.io/{repository}/` 주소에서 모든 화면과 이미지를 확인합니다.

모든 자산은 `./css`, `./js`, `./images` 상대경로를 사용하므로 GitHub Pages의 하위 repository 경로에서도 동작합니다.

## QR Code 운영 원칙

QR Code는 GitHub Pages production URL이 확정된 뒤 한 번만 생성합니다. 이후 내용이나 이미지는 같은 repository에 업데이트하여 같은 URL을 유지합니다. 이렇게 하면 현장 QR을 다시 출력하지 않아도 됩니다.

## 개인정보 및 외부 서비스

로그인, Analytics, 광고, 위치 추적, Cookie, 외부 DB를 사용하지 않습니다. 퇴실 체크 상태는 현재 브라우저 탭의 세션에만 저장되며 탭을 닫으면 초기화됩니다.
