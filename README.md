```
SUZIP-Frontend
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ main
│  │     │  └─ soyeon
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ dahyun
│  │           ├─ develop
│  │           ├─ HEAD
│  │           └─ soyeon
│  ├─ ORIG_HEAD
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ main
│     │  └─ soyeon
│     ├─ remotes
│     │  └─ origin
│     │     ├─ dahyun
│     │     ├─ develop
│     │     ├─ HEAD
│     │     └─ soyeon
│     └─ tags
├─ .gitignore
├─ .idea
│  ├─ modules.xml
│  ├─ SUZIP-Frontend.iml
│  ├─ vcs.xml
│  └─ workspace.xml
├─ @types
│  └─ global
│     └─ index.d.ts
├─ package-lock.json
├─ package.json
├─ public
│  └─ index.html
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ buttons
│  │  │  ├─ GetStarted_Black.tsx
│  │  │  ├─ GetStarted_White.tsx
│  │  │  ├─ Logout_Black.tsx
│  │  │  └─ Logout_White.tsx
│  │  ├─ fonts
│  │  │  ├─ Font.css
│  │  │  ├─ MonumentExtended-Regular.otf
│  │  │  ├─ MonumentExtended-Ultrabold.otf
│  │  │  ├─ PPMonumentExtended-Black.otf
│  │  │  ├─ PPMonumentExtended-Light.otf
│  │  │  ├─ PPMonumentExtended-Regular.otf
│  │  │  ├─ Pretendard-Black.otf
│  │  │  ├─ Pretendard-Bold.otf
│  │  │  ├─ Pretendard-ExtraBold.otf
│  │  │  ├─ Pretendard-ExtraLight.otf
│  │  │  ├─ Pretendard-Light.otf
│  │  │  ├─ Pretendard-Medium.otf
│  │  │  ├─ Pretendard-Regular.otf
│  │  │  ├─ Pretendard-SemiBold.otf
│  │  │  └─ Pretendard-Thin.otf
│  │  ├─ images
│  │  │  ├─ add.png
│  │  │  ├─ Angriness.png
│  │  │  ├─ close.png
│  │  │  ├─ close2.png
│  │  │  ├─ Delete.png
│  │  │  ├─ diarymenu.png
│  │  │  ├─ dropdownarrow.png
│  │  │  ├─ error.png
│  │  │  ├─ Excited.png
│  │  │  ├─ garbage.png
│  │  │  ├─ google.png
│  │  │  ├─ graph.png
│  │  │  ├─ Happiness.png
│  │  │  ├─ Horror.png
│  │  │  ├─ kakao.png
│  │  │  ├─ left.png
│  │  │  ├─ logo.png
│  │  │  ├─ menu.png
│  │  │  ├─ more_gray.png
│  │  │  ├─ more_white.png
│  │  │  ├─ naver.png
│  │  │  ├─ nextmove.png
│  │  │  ├─ nextpage.png
│  │  │  ├─ pencil.png
│  │  │  ├─ photo.png
│  │  │  ├─ prevmove.png
│  │  │  ├─ prevpage.png
│  │  │  ├─ profile.png
│  │  │  ├─ profiledit.png
│  │  │  ├─ right.png
│  │  │  ├─ rightArrow.png
│  │  │  ├─ rightArrow2.png
│  │  │  ├─ Sadness.png
│  │  │  ├─ search.png
│  │  │  ├─ sz.png
│  │  │  └─ todaymove.png
│  │  ├─ pagination
│  │  │  └─ Pagination.tsx
│  │  └─ path
│  │     └─ config.js
│  ├─ components
│  │  ├─ about
│  │  │  ├─ AnalyzeDescription.tsx
│  │  │  ├─ CalendarDescription.tsx
│  │  │  ├─ EmotionBox.tsx
│  │  │  ├─ RecordDescription.tsx
│  │  │  ├─ Slider2.tsx
│  │  │  └─ TitleTypo.tsx
│  │  ├─ archives
│  │  │  ├─ BookCard.tsx
│  │  │  ├─ BookRecommend.tsx
│  │  │  ├─ MovieCard.tsx
│  │  │  ├─ MovieRecommend.tsx
│  │  │  ├─ MusicCard.tsx
│  │  │  └─ MusicRecommend.tsx
│  │  ├─ auth
│  │  │  └─ AuthContext.tsx
│  │  ├─ header
│  │  │  └─ Header.tsx
│  │  ├─ modal
│  │  │  ├─ DeleteModal.tsx
│  │  │  ├─ EditModal.tsx
│  │  │  ├─ SaveModal.tsx
│  │  │  └─ WriteModal.tsx
│  │  └─ social
│  │     ├─ GoogleLogin.tsx
│  │     ├─ GoogleSignUp.tsx
│  │     ├─ KakaoCallback.jsx
│  │     ├─ KakaoLogin.tsx
│  │     ├─ KakaoSignUp.tsx
│  │     ├─ NaverLogin.tsx
│  │     └─ NaverSignUp.tsx
│  ├─ data
│  │  ├─ ContentData.json
│  │  ├─ Diary.json
│  │  └─ ScrapItems.json
│  ├─ index.css
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ AboutPage.tsx
│  │  ├─ AnalyzePage.tsx
│  │  ├─ ArchivePage.tsx
│  │  ├─ DeleteAccount.tsx
│  │  ├─ DiaryPage.tsx
│  │  ├─ DiaryViewPage.tsx
│  │  ├─ EditProfile.tsx
│  │  ├─ HomePage.tsx
│  │  ├─ IndexPage.tsx
│  │  ├─ MyPage.tsx
│  │  ├─ ScrapPage.tsx
│  │  ├─ SignInPage.tsx
│  │  ├─ SignUpPage.tsx
│  │  └─ WritePage.tsx
│  └─ setupProxy.js
└─ tsconfig.json

```
