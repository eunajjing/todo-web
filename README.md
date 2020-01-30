# TODO-WEB

## Work Convention

- branch 전략은 [Github Flow](https://guides.github.com/introduction/flow/) 를 이용합니다.
  - 해당 featrue 에 따른 issue 를 등록하여 작업을 합니다.
  - 한 commit 에는 되도록 하나의 작업만 담습니다.
  - rebase 를 하는것을 지향합니다.
- [commit convention](https://blog.ull.im/engineering/2019/03/10/logs-on-git.html)
  - husky 를 이용하여 commit 을 검증합니다.

<br />

## Folder Structure

```text
.
+-- pages: route 단위의 페이지
|   +-- _app.tsx: 공통 Application Container
|   +-- _document.tsx: Custom 한 Document 를 처리합니다 (head, body 등)
|   +-- _error.tsx : 공통 에러 페이지
|   +-- *.tsx: route 단위의 페이지 컴포넌트 (ex. <path>/todo -> todo.tsx)
+-- src: 컴포넌트 조각들
|   +-- design-system: 디자인 시스템 구성요소 (theme, atom, molecules 등 아토믹한 구조를 가집니다)
|   +-- helper: helper 함수
|   +-- <관심사 단위의 폴더 구조>
|   +-- *.tsx: 공통 컴포넌트
+-- .babelrc: babel 설정
+-- .eslintrc: eslint 설정
+-- .prettier: prettier 설정
+-- .editorconfig: editor 설정
+-- .tsconfig: typescript 설정
```

<br />

## Theme

Styled-Component 의 Theme Provider 를 이용하여 theme set 을 주입받습니다.

테마는 아래와 같은 모양을 가집니다.

<br />

#### Structure

```js
fontSize: {},
colors: {},
```

#### How to use ?

```js
/* 
  아래와 같이 ThemeProvider 를 사용한다면 모든 styled component 내부에는 prop 으로 theme 가 내려옵니다.
*/
function App() {
  return (
    <ThemeProvider>
      <Container {...pageProps} />
    </ThemeProvider>
  )
}

const Container = steyld.div`
 ${(
   { bg, theme }, // theme: { fontSize: {}, colors: {} }
 ) =>
   bg &&
   theme.colors[bg] &&
   css`
     background-color: ${theme.colors[bg]};
   `}
`
```

<br />

## Code Convention

eslint (ts-lint) 와 prettier 를 사용합니다.
rule set 은 기본적으로 recommended 를 확장하여 사용합니다

vscode 의 경우 아래의 설정이 추가적으로 필요합니다.

```text
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
"editor.formatOnSave": true,
```
