# 스크래퍼

## 소개
사이트에서 검색된 제품들의 사진과 정보들을 엑셀로 출력합니다.

**실행 화면**
![scraper](https://user-images.githubusercontent.com/71337000/136776364-b304176a-22f7-4d0c-b3e3-f0167a5fa459.gif)
> 

## 기술
### 언어
+ HTML
+ SCSS
+ TypeScript
+ JavaScript

### 프레임워크
+ Electron
+ Jest

### 라이브러리
+ React
+ DOM Testing Library

### 도구
+ Prettier
+ ESLint
+ Webpack

## 목표
+ ~~React 클래스 형 컴포넌트로 개발 후 함수형 컴포넌트로 코드 변경해 보기~~
+ ~~React Testing Librar로 테스트 코드 작성해 보기~~
+ ~~Electron으로 데스크톱 앱 개발 후 Electron Forge로 배포 파일 만들기~~
+ ~~JavaScript로 컴포넌트 만들어 보기~~
+ ~~DOM Testing Library로 JavaScript 컴포넌트 테스트 코드 작성해 보기~~
+ ~~한글 변수 사용해 보기~~
+ ~~TypeScript로 마이그레이션 해 보기~~
+ TypeScript 클린 코드, 구글 스타일 가이드 참고하며 코드 수정하기

가족의 요청으로 시작하게 되었습니다. 초기에는 Listly(구글 익스텐션)를 사용해 보았지만 매번 페이지를 지정해 주어야 하는 단점 때문에 다른 방법으로 Excel과 Selenium을 사용해 보았습니다.
원하는 페이지를 자동으로 스크랩할 수 있었지만 VBA가 익숙지 않았고, 무엇보다 속도가 너무 느리게 느껴졌습니다. 가장 많이 다루어본 JS로 언어의 문제를 해결하는 한편 속도와 관련된 문제를 개선하고 
싶어 프로젝트로 진행해 보게 되었습니다.

## Node.js + Puppeteer  
Puppeteer와 관련된 자료들이 많아 참고하며 진행해 보았지만 속도는 여전히 느렸습니다. 찾아보니 응답 후 페이지가 로드되기까지 시간이 필요한 경우(CSR)에 사용된다는 것을 알았습니다. 그렇다면
원하는 정보들을 SSR로 얻을 수 있다면 다른 도구를 사용할 필요가 없었습니다. AJAX로 확인해 보니 SSR 응답으로 필요한 정보들을 얻을 수 있었습니다. 그대로 코드를 client-side로 옮겨 진행하려
했지만...

## CORS
CORS에 막혀 원하는 응답을 받지 못했습니다. client-side를 고집한 것은 사용자가 Node.js의 설치부터 CLI로 실행까지 불편한 UX로 이어질 것이라 생각했기 때문입니다. 이 상황을 해결하기 위한 첫 번째
시도는 프락시 사이트를 통한 우회였습니다. 처음엔 생각보다 괜찮은 속도가 나와 그대로 사용하려 했지만 당시에 주말 저녁이어서 사용자가 많이 없었던 것 같습니다. 평일 오전에 사용해 보니
도저히 사용 못 할 속도가 나왔습니다. 다음 방법으로 크롬 설정을 통한 우회였습니다. 약간의 설정이 필요하지만 CORS를 해결할 수 있는 가장 간단한 방법이라 생각했고 사용하는 브라우저도 사전에
물어봤었기에 이 방법으로 진행하기로 하였습니다.

## React
React

