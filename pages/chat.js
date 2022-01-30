import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { FiSend } from 'react-icons/fi';
import { ImExit } from 'react-icons/im';
import { ButtonR } from '../src/components/chat/styled.js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM2MTg2OSwiZXhwIjoxOTU4OTM3ODY5fQ.KSJbN-8SPCHaCd6KqwjfWx1XHMM9qfKb8vjTgTSG4N4';
const SUPABASE_URL = 'https://mnhotwsxizpxilqzgqlt.supabase.co';
const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY)

function pegaMensagemEmTempoReal(adicionaMensagem){
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe()     
}

export default function ChatPage() {
    const router = useRouter();
    const userLogin = router.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);


    React.useEffect( () => {
        supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false})
        .then (( { data })=> {
            console.log('Dados da consulta: ', data)
            setListaDeMensagens(data);
        })

        pegaMensagemEmTempoReal((novaMensagem) => {
            setListaDeMensagens((valorAtualDaLista) => {
                return [novaMensagem,...valorAtualDaLista]
            });
        });
    }, []);
    

    function handleNovaMensagem(novaMensagem) {
        const message = {
            texto: novaMensagem,
            de: userLogin,
            // id: listaDeMensagens.length + 1
        }

        supabaseClient
            .from('mensagens')
            .insert([message])
            .then(({ data }) => {
                console.log(data)
               /*  setListaDeMensagens([data[0], ...listaDeMensagens])
                  */
            });

            setMensagem('');
        
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['000'],
                backgroundImage: `url(https://hypescience.com/wp-content/uploads/2021/04/universo-scaled.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    opacity: 0.9,
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens}>
                        {/* listaDeMensagens.map((element) => {
                            return (
                                <>
                                    <li key={element.id}>
                                        {element.de}: {element.texto}
                                    </li>
                                </>
                            )
                        }) */}
                    </MessageList>





                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            value={mensagem}
                            onChange={(e) => {
                                const result = e.target.value
                                setMensagem(result);
                            }}
                            onKeyPress={(event) => {

                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '8px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) =>{
                                
                                handleNovaMensagem(':sticker:'+sticker)
                            }}
                        />
                         <Button
                            styleSheet={{
                            borderRadius: '50%',
                            padding: '0 3px 0 0',
                            minWidth: '50px',
                            minHeight: '50px',
                            fontSize: '20px',
                            marginBottom: '8px',
                            lineHeight: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '0.5vw',
                            backgroundColor: appConfig.theme.colors.neutrals[300],
                            hover: {
                                backgroundColor: appConfig.theme.colors.primary[400]
                            }
                            }}
                            label={<FiSend/>}
                            onClick={() =>{
                                handleNovaMensagem(mensagem)
                            }}
                        />                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    styleSheet={{
                    borderRadius: '50%',
                    padding: '0 0px 0 0',
                    minWidth: '50px',
                    minHeight: '50px',
                    fontSize: '20px',
                    marginBottom: '8px',
                    lineHeight: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '0.5vw',
                    backgroundColor: appConfig.theme.colors.neutrals[300],
                    hover: {
                        backgroundColor: appConfig.theme.colors.primary[400]
                    }
                    }}
                    variant='tertiary'
                    colorVariant='neutral'
                    label={<ImExit/>}
                    href="/"
                />  
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                overflowX: 'hidden',
                
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                
            }}
        >

            {props.mensagens.map((mensagem) => {
                const newLocal = 'sticker:';
                return (
                    <>
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >

                                <Box
                                    styleSheet={{
                                        display: 'flex',
                                    }}
                                >
                                    <Image
                                        styleSheet={{
                                            width: '40px',
                                            height: '40px',
                                            margin: '1vh',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                        src={`https://github.com/${mensagem.de}.png`}
                                    />
                                    <Text styleSheet={{
                                            marginTop: '20px',
                                            fontSize: '1.2rem'  
                                        }} tag="strong">
                                        
                                        {mensagem.de}
                                    </Text>
                                    <Text
                                    styleSheet={{
                                        marginLeft: '2vh',
                                        marginTop: '2.5vh',
                                        fontSize: '0.7rem',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                                </Box>
                            </Box>
                            {mensagem.texto.startsWith(':sticker:') ? ( <Image src={mensagem.texto.replace(':sticker:','')}/>) : (mensagem.texto)}
                            
                        </Text>
                    </>
                )
            })}
        </Box>
    )
}