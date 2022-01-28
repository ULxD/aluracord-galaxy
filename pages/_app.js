import '../styles/globals.css'

function GlobalStyle(){
  return(
          <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
    }
    body {
      font-family: 'Open Sans', sans-serif;
    }
    /* App fit Height */ 
    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }
    /* ./App fit Height */ 
    .btn{
      border: 2px solid #ffffff;
      height: 4vh;
      width: 5vw;
      cursor: pointer;
      padding: 1vh 0.5vw
    }
  `}</style>
);
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
    )
}

export default MyApp
