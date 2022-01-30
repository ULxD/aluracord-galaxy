import { Box, Button, Text, TextField, Image} from '@skynexui/components'
import React from 'react';
import appConfig from '../config.json'
import { useRouter } from 'next/router'



function Titulo(props){
    const Tag = props.tag || "h1"
    return(
        <div>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                h2{
                    color: #ffffff
                }
            `}</style>
        </div>
    )
}


/* function HomePage() {
    const router = useRouter();
    return (
        <div>
            <GlobalStyles/>
            <Titulo tag="h1">Bem vindos de volta</Titulo>
            <Titulo tag="h2">Discord - UL xD</Titulo>
            <li className={router.pathname == "/second" ? "active" : ""}>
              <Link href="/second">about</Link>
            </li>
        </div>
    )
} export default HomePage*/
  
  

export default function PaginaInicial() {

  const [username, setUsername] = React.useState('');
  const [checkname, setCheckname] = React.useState('');
  const router = useRouter();

  return (
    <>

      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[100],
          backgroundImage: 'url(https://hypescience.com/wp-content/uploads/2021/04/universo-scaled.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={ (e) => {
              e.preventDefault()
              router.push(`/chat?username=${username}`)
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['000'] }}>
              {appConfig.name}
            </Text>

          {<TextField
              value={checkname}
              onChange={(event)=>{
                //Variavel do valor
                const valor = event.target.value;
                setCheckname(valor);
                if (valor.length >= 3){
                  setUsername(valor);
                }else{
                  setUsername('');
                }
                //Trocar a variavel
          
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[700],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />}
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[400],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[700],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '3px solid',
              borderColor: appConfig.theme.colors.neutrals[400],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}