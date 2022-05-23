import { Button } from "@paco_ua/pacoui";
import { Text, AnimatedBackground } from "@uaveiro/ui";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EntitiesContext, UserContext } from "./Helper/Context";
import useFetch from "./Helper/useFetch";
import useGetDPUC from "./Helper/useGetDPUC";

import {
    ThemeProvider as ThemeProviderPortal,
    Theme as ThemePortal
  } from "@uaveiro/ui";


const ViewDPUC = () => {

    const { id } = useParams();

    const { userType } = useContext(UserContext);

    const URL_DPUC = "http://localhost:8000/dpuc/" + id;

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    }

    const { retryFetch, setRetry, uos, areas, docentes} = useContext(EntitiesContext);

    const { data , loading: loadDPUC, error: errorDPUC } = useFetch(URL_DPUC);
    
    const { parsing: loadParse, error: errorParse, dpuc} = useGetDPUC(data);

    const [ detailedView, setDetailedView ] = useState(false);

    const changeView = () => {
        setDetailedView(!detailedView);
    }
    const reloadEntities = () => {
        setRetry(retryFetch + 1);
    }

    return ( 
        <Container>
            <Row>
                <Col>
                <ThemeProviderPortal theme={ThemePortal}>
                    { loadDPUC && <AnimatedBackground height="30px" width="50%"></AnimatedBackground> }
                    { dpuc && !loadDPUC && 
                        <Text as="h3" size="xLarge" fontWeight="400"> 
                            {dpuc.designacao}
                        </Text>
                    }
                    <hr/>
                </ThemeProviderPortal>
                </Col>
            </Row>
            <br/>
            { (!uos || !areas || !docentes) &&
                !loadDPUC && !dpuc &&
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                    <ThemeProviderPortal theme={ThemePortal}>
                        <Text as="i" size="large" color="red"> Não possível obter informações sobre esta UC.</Text>
                    </ThemeProviderPortal>
                    </Col>
                    <Col md="auto">
                        <Button primary onClick={reloadEntities} style={{fontSize:"100%"}}>Recarregar</Button>
                    </Col>
                </Row>
            }
            <ThemeProviderPortal theme={ThemePortal}>
            { loadDPUC && <AnimatedBackground height="100px" width="50%"></AnimatedBackground> }
            { errorDPUC && <Text as="i" size="large" color="red"> Não foi possível obter informações sobre esta UC. </Text> }
            </ThemeProviderPortal>
            { dpuc && !loadDPUC &&
            <Container> 
                <Row>
                    <Col md={2} style={{paddingTop:"10px"}}>
                        <Button action style={{fontSize:"100%"}} onClick={handleBack}>
                            Voltar
                        </Button>
                    </Col>
                    <Col md={4} style={{paddingTop:"10px"}}>
                        {detailedView && 
                        <Button primary style={{fontSize:"100%"}} onClick={changeView}>
                            Vista Normal
                        </Button>
                        }
                        {!detailedView && 
                        <Button success style={{fontSize:"100%"}} onClick={changeView}>
                            Vista Detalhada
                        </Button>
                        }
                    </Col>
                    {userType === "SGA" && 
                        <Col md={6} style={{paddingTop:"10px"}}>
                            <Row>
                                <Col>
                                    <Button danger style={{fontSize:"100%"}}>
                                        Fechar DPUC
                                    </Button>
                                </Col>
                                <Col>
                                    <Button primary style={{fontSize:"100%"}}>
                                        Aprovar DPUC
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    }
                </Row>
                <br/>
                <ThemeProviderPortal theme={ThemePortal}>
                <Row>
                    <Col>
                        <Text as="i" size="medium"> Última alteração: {dpuc.dataAlteracao && dpuc.dataAlteracao.toLocaleDateString()}</Text>
                    </Col>
                    {   detailedView && dpuc.estado &&
                        <Col sm={"auto"}>
                            <Text as="i" size="medium" color="#63CF7C" fontWeight="500"> Estado: {dpuc.estado}</Text>
                        </Col>
                    }
                </Row>
                <Row className="flex-column-reverse flex-md-row">
                    <Col sm={8}>
                        { dpuc.objetivos &&
                            <Row>
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Objetivos
                                </Text>
                                {dpuc.objetivos.split("\n").map((objetivo) =>(
                                    <Text as="article" size="medium">
                                        { objetivo }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.conteudos &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Conteúdos
                                </Text>
                                {dpuc.conteudos.split("\n").map((conteudo) =>(
                                    <Text as="article" size="medium">
                                        <li>{ conteudo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.coerenciaConteudos && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#63CF7C" fontWeight="400">
                                    Coerência de Conteúdos
                                </Text>
                                {dpuc.coerenciaConteudos.split("\n").map((conteudo) =>(
                                    <Text as="article" size="medium">
                                        <li>{ conteudo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.requisitos &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Requisitos
                                </Text>
                                {dpuc.requisitos.split("\n").map((requisito) =>(
                                    <Text as="article" size="medium">
                                        <li>{ requisito }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.metodologias &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Metodologias de Ensino
                                </Text>
                                {dpuc.metodologias.split("\n").map((metodo) =>(
                                    <Text as="article" size="medium">
                                        { metodo }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.coerenciaMetodologias && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#63CF7C" fontWeight="400">
                                    Coerência de Conteúdos
                                </Text>
                                {dpuc.coerenciaMetodologias.split("\n").map((metodo) =>(
                                    <Text as="article" size="medium">
                                        <li>{ metodo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.funcionamento &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Funcionamento da Componente Prática
                                </Text>
                                {dpuc.funcionamento.split("\n").map((func) =>(
                                    <Text as="article" size="medium">
                                        { func }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.aprendizagem &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Aprendizagem Ativa
                                </Text>
                                {dpuc.aprendizagem.split("\n").map((apre) =>(
                                    <Text as="article" size="medium">
                                        { apre }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.avaliacao &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Avaliação
                                </Text>
                                {dpuc.avaliacao.toString().split("\n").map((aval) =>(
                                    <Text as="article" size="medium">
                                        { aval }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.regimeFaltas &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Regime de Faltas
                                </Text>
                                {dpuc.regimeFaltas.split("\n").map((faltas) =>(
                                    <Text as="article" size="medium">
                                        { faltas }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.ficheiros &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Ficheiros
                                </Text>
                                {dpuc.ficheiros.split("\n").map((ficheiro) =>(
                                    <Text as="article" size="medium">
                                        <li><a href={ficheiro} target="_blank">{ ficheiro }</a></li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.bibliografia &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Bibliografia
                                </Text>
                                {dpuc.bibliografia.split("\n").map((livro) =>(
                                    <Text as="article" size="medium">
                                        <li>{ livro }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.observacoes && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#63CF7C" fontWeight="400">
                                    Observações
                                </Text>
                                {dpuc.observacoes.split("\n").map((obs) =>(
                                    <Text as="article" size="medium">
                                        <li>{ obs }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                    </Col>
                    <Col sm={4}>
                        <Container className="uc_details">
                            <Row style={{paddingTop:"10px"}}>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Código </Text>
                                    <Text as="p" size="mediumSmall">{ dpuc.codigo }</Text>
                                </Col>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">ECTS</Text>
                                    <Text as="p" size="mediumSmall">{dpuc.ects}</Text>
                                </Col>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Grau</Text>
                                    <Text as="p" size="mediumSmall">{dpuc.grau.nome}</Text>
                                </Col>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall" fontWeight="500"> Unidade Orgânica</Text>
                                <Text as="span" size="mediumSmall">{dpuc.unidadeOrganica.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall" fontWeight="500"> Área Científica</Text>
                                <Text as="span" size="mediumSmall">{dpuc.areaCientifica.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Docente Responsável</Text>
                                <Text as="span" size="mediumSmall">{dpuc.responsavel.nome_completo}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Idioma(s) de lecionação</Text>
                                {
                                 dpuc.linguas.map((l) => (
                                    <Text as="span" size="mediumSmall">{l.nome}</Text>
                                 ))
                                }
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Modalidade</Text>
                                <Text as="span" size="mediumSmall">{dpuc.modalidade.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Carga letiva semanal</Text>
                                {dpuc.horasT > 0 && <Text as="span" size="mediumSmall">T: {dpuc.horasT}H</Text>}
                                {dpuc.horasTP > 0 && <Text as="span" size="mediumSmall">TP: {dpuc.horasTP}H</Text>}
                                {dpuc.horasP > 0 && <Text as="span" size="mediumSmall">PL: {dpuc.horasP}H</Text>}
                                {dpuc.horasOT > 0 && <Text as="span"size="mediumSmall">OT: {dpuc.horasOT}H</Text>}
                                <hr className="uc_details_hr"/>
                            </Row>
                            { dpuc.paginaPublica &&
                                <Row>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Página pública da UC</Text>
                                    <Text as="span" size="mediumSmall">{dpuc.paginaPublica}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                            }
                            <Row style={{paddingBottom:"10px"}}>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Cursos</Text>
                                {
                                 dpuc.cursos.map((curso) => (
                                    <Text as="li" size="mediumSmall">{curso.nome}</Text>
                                 ))   
                                }
                            </Row>
                        </Container>
                        <br/>
                        { detailedView &&
                            <Container className="uc_details_extra">
                                <Row style={{paddingTop:"10px"}}>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Carga Horária</Text>
                                    <Text as="span" size="mediumSmall">{dpuc.cargaHoraria}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                                <Row>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Horas de Trabalho</Text>
                                    <Text as="span" size="mediumSmall">{dpuc.horasTrabalho}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                                <Row>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Período</Text>
                                    <Text as="span" size="mediumSmall">{dpuc.periodo.nome}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                                <Row style={{paddingBottom:"10px"}}>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Docentes</Text>
                                    {
                                        dpuc.docentes.map((docente) => (
                                            <Text as="span" size="mediumSmall">{docente.nome_completo}</Text>
                                            ))   
                                    }
                                </Row>
                            </Container>
                        }
                    </Col>
                </Row>
                </ThemeProviderPortal>
            </Container>
            }
        </Container>
     );
}
 
export default ViewDPUC;