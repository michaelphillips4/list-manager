# Basic Template 

Starter template for front and backend allowing.

- Auth
- CRUD 
- Style

https://docs.amplify.aws/react/how-amplify-works/


# React + TypeScript + Vite + aws amplify + graphql


npm create vite@latest . -- --template typescript
npm create amplify@latest -y
npm install aws-amplify @aws-amplify/ui-react
npx ampx sandbox

# Css

Most basic style center gutter. 
All p tags will left aligh. 
Supports light dark mode basic form field styling.

```

:root {
  color-scheme:light dark;
  --bg: light-dark(white, #100c08);
  --font-color: light-dark(#100c08, rgb(230, 230, 230))
}

body {
  font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif;
  padding:0 40px ;
  color:var(--font-color);
  background:var(--bg);
  line-height:1.4;
  max-width:800px;
  margin:20px auto
}

p{
  text-align: left;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
}

```
