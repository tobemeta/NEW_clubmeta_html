# NEW_clubmeta_html

### 퍼블리싱프로그램(에디터) : vscode   test
> <https://code.visualstudio.com/>   
> Microsoft의 무료 라이센스 프로그램   
> 설치형, 무설치형(포터블) 있습니다.
<br />

### vscode 확장프로그램
1. Live Sass Compiler (필수) - scss 컴파일러   
<https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass>
2. Live Server (필수) - live 로컬서버(html용)   
<https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer>
3. prettier (필수) - 소스코드 정리   
<https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
4. HTMLHint (필수) - 마크업 문법 검사   
<https://marketplace.visualstudio.com/items?itemName=ctf0.htmlhint>    
5. Git Graph (선택) - vscode에서 git 사용편의성 UP   
<https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph>    

그외 확장프로그램 작업자 취향껏 설치하면 됩니다.   
<br />
   
### vscode 환경설정
- 프로젝트폴더 루트 경로에 .vscode 폴더를 생성 후 settings.json파일을 만들어서 그안에 복붙하면 됩니다.
- 해당 폴더 및 파일은 mydata git서버에는 올리지 않습니다.

```
{
  "liveSassCompile.settings.formats": [
    {
      "format": "compressed",
      "extensionName": ".min.css",
      "savePath": "~/../css/"
    }
  ],
  "liveSassCompile.settings.autoprefix": [
    "> 2%",
    "last 2 versions"
  ],
  "liveServer.settings.port": 8800,
  "files.eol": "\n",
  "editor.tabSize": 4,

  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // "editor.formatOnSave": true,
  "[html]": {
    "editor.formatOnSave": true
  },
  "[scss]": {
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "prettier.tabWidth": 4,
  "prettier.singleQuote": true,
  "prettier.printWidth": 9999,
  "prettier.trailingComma":"none",
  "htmlhint.options":{
    "tagname-lowercase": true,
    "attr-lowercase":["viewBox"],
    "attr-value-double-quotes": true,
    "doctype-first": true,
    "tag-pair": true,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true,
    "title-require": true,
  }
}
```
### (prettier 사용 시) .prettierignore 설정
- 프로젝트 폴더 루트경로에 .prettierignore 생성 후 복붙하면 됩니다.
```
**/node_modules/*
**/*.min.*
**/lib/*
**/mail/*
_font.scss
front.scss
```

### svg 이미지를 소스코드(bg)로 전환
> <https://yoksel.github.io/url-encoder/>   
- 해당경로로 접속 후 'Insert SVG'에 svg 소스 복붙하면 확인가능합니다.
<br />
