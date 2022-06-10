import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, ButtonGroup } from "react-bootstrap";
import { LoadingBackgroundWrapper, Button, Text, ScrollDownButton, SearchBox } from "@paco_ua/pacoui"
import Selector from "./Selector";
import CardDPUC from "./CardDPUC";
import useFetch from '../Helper/useFetch';
import axios, { Axios } from 'axios';

const DPUCList = ({canCreate, canLaunchEdit=false}) => {

    const navigate = useNavigate();

    const URL_DPUC = process.env.REACT_APP_FETCHER + "creation/dpucs";
    const URL_LAUNCH = process.env.REACT_APP_FETCHER + "edition/iniciarEdicao";
    const URL_SEARCH = process.env.REACT_APP_SEARCH + "search?keywords=";

    const goToCreate = () => {
        navigate("/create");
    }

    const launchEdit = () => {
        setLaunchLoading(true);
        setLaunchError(false);
        axios
            .put(URL_LAUNCH)
            .then(() => {
                window.location.reload(false);
            })
            .catch((error) => {
                setLaunchError(error);
            })
            .finally(() => {
                setLaunchLoading(false);
            });
    }

    const { data: dpucs , loading, error } = useFetch(URL_DPUC);

    const [filterOptions, setFilterOptions] = useState(
        [
            {
                key: 'Todos',
                text: 'Mostrar Todos',
                value: [0]
            },
            {
                key: 'Em Criação',
                text: '1 - Em Criação',
                value: [1, 7]
            },
            {
                key: 'Em Edição',
                text: '2 - Em Edição',
                value: [2, 8]
            },
            {
                key: 'Fechados',
                text: '3 - Fechados',
                value: [3]
            },
            {
                key: 'Em Aprovação',
                text: '4 - Em Aprovação',
                value: [4, 9]
            },
            {
                key: 'Aprovados',
                text: '5 - Aprovados',
                value: [5, 10]
            },
            {
                key: 'Desativados',
                text: '6 - Desativados',
                value: [6]
            },
        ]
    )

    const [filterOption, setFilterOption] = useState(filterOptions[0]);
                
    const [dpucList, setDPUCList] = useState([]);
    const [dpucSearchList, setDPUCSearchList] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [launchLoading, setLaunchLoading] = useState(false);
    const [launchError, setLaunchError] = useState(false);

    const [maxPerPage, setMaxPerPage] = useState(10);
    const [currentPage, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const [dpucPage, setDPUCPage] = useState([]);

    const previousPage = () => {
        if(currentPage == 1)
            return;
        setPage(currentPage - 1);
    }
    const nextPage = () => {
        if(currentPage == maxPage)
            return;
        setPage(currentPage + 1);
    }

    // When DPUC List page changes
    useEffect( () => {
        if(currentPage < 1 || currentPage > maxPage)
            return;
        setDPUCPage(dpucList.slice((currentPage - 1) * maxPerPage, currentPage * maxPerPage));
    },[currentPage]);

    // When DPUC List finishes filtering
    useEffect( () => {
        if(!dpucList)
            return;
        setMaxPage(Math.floor(dpucList.length / maxPerPage) + 1);
        setPage(1);
        setDPUCPage(dpucList.slice((currentPage - 1) * maxPerPage, currentPage * maxPerPage));
    },[dpucList]);

    const filterByFilter = (list) =>{
        if(filterOption.value[0] === 0)
            return list;
        return list.filter((d) => (filterOption.value.includes(d.estadoid)))
    }

    const filterBySearch = (list) =>{
        if(searchResults.length === 0 && (!searchInput || searchInput === ""))
            return list;
        return list.filter((d) => (searchResults.includes(d.ucCodigo)));
    }

    useEffect(() => {
        const fbs = filterBySearch(dpucs);
        setDPUCList(filterByFilter(fbs));
        setDPUCSearchList(fbs)
    },[filterOption, searchResults])

    useEffect(() => {
        if(!searchInput || searchInput.length === 0){
            setDPUCList(dpucs);
            setSearchResults([]);
            return;
        }
        const keywords = searchInput.split(" ").join("+");
        axios
            .get(URL_SEARCH+keywords)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.log(error)
                //setError(error);
            })
            .finally(() => {
                //setLoading(false);
            });
    }, [searchInput]);

    useEffect(() => {
        if(!dpucSearchList)
            return;
        const filterCount = new Array(filterOptions.length).fill(0);
        dpucSearchList.map((d) => {
            const filter = filterOptions.find((f) => f.value.includes(d.estadoid));
            filterCount[filterOptions.indexOf(filter)] ++;
        });
        const newFilterOptions = [];
        for(let i = 0; i < filterCount.length; i++){
            const newFilter = filterOptions[i];
            if(newFilter.value.includes(0))
                newFilter.text = newFilter.text.split("(")[0] += " (" + dpucList.length + ")";
            else
                newFilter.text = newFilter.text.split("(")[0] += " (" + filterCount[i] + ")";
            newFilterOptions.push(newFilter);
        }
        setFilterOptions(newFilterOptions);
    }, [dpucSearchList]);

    useEffect(() =>{
        if(!dpucs)
            return;
        setDPUCList(dpucs);
        setDPUCSearchList(dpucs);
    }, [dpucs])

    return ( 
        <Container>
            <div style={{ position:"fixed", bottom:"50px", right:"10px",  transform: "rotate(180deg)"}}>
                <ScrollDownButton onClick={() => window.scrollTo(0, 0)} />
            </div>
            <div style={{ position:"fixed", bottom:"10px", right:"10px"}}>
                <ScrollDownButton onClick={() => window.scrollTo(0, document.body.scrollHeight)}/>
            </div>

            { loading && <LoadingBackgroundWrapper loading length={4} /> }
            { error && <Text as="i" size="large" color="red"> Não foi possível obter os seus Dossier Pedagógicos.</Text> }
            { !error && !loading &&
                <>
                    <Row>
                        <Col style={{textAlign:"left", paddingBottom:"10px"}}>
                            <br/>
                            { canCreate && 
                                <Button primary onClick={goToCreate} style={{fontSize:"100%"}}>
                                    Criar nova UC
                                </Button>
                            }
                            { canLaunchEdit && 
                                <Button primary onClick={launchEdit} style={{fontSize:"100%"}}>
                                    {
                                        (launchLoading && "A iniciar Processo de Edição...")
                                        ||
                                        "Iniciar Processo de Edição"
                                    }
                                </Button>
                            }
                            {
                                launchError &&
                                <Text as="i" size="large" color="red"> Não foi possível iniciar o processo de Edição de DPUCs.</Text>
                            }
                        </Col>
                    </Row>
                    <Row style={{paddingBottom:"10px"}}>
                        <Col md="8">
                            <Text>
                                Pesquisa de DPUC:
                            </Text>
                            <SearchBox
                                borderColor="#000"
                                value={searchInput}
                                iconColor=""
                                onSearch={(e) => setSearchInput(e)}
                                placeholder="Parâmetros de pesquisa de DPUC"
                            />
                        </Col>
                        <Col  md="4">
                            <Text>
                                Filtrar DPUCs por estado:
                            </Text>
                            {
                                dpucList &&
                                <Selector
                                    options={filterOptions}
                                    getOptionLabel={(option)=>option.text}
                                    defaultValue={filterOptions[0]}
                                    value={filterOption}
                                    onChange={(e) => setFilterOption(e)}
                                    isClearable={false}
                                />
                            }

                        </Col>
                    </Row>
                </>
            }
            { dpucPage &&
                dpucPage.map((uc) => (
                    <CardDPUC key={uc.id} dpuc={uc}/>
                ))
            }
            { (!dpucPage || dpucPage.length === 0) &&
                <Text as="i" size="large" style={{paddingTop:"10px"}}>Não foram encontrados DPUCs</Text>
            }
            <Row>
                <Col></Col>
                <Col>
                    <ButtonGroup>
                        { 
                            (currentPage > 1 && 
                                <Button primary onClick={previousPage}>{"<"}</Button>)
                            ||
                            <Button primary disabled>{"<"}</Button>
                        }
                        <Text size="large" color="primary" 
                                className="align-self-center"
                                style={{paddingLeft:"15px", paddingRight:"15px"}}
                        >
                            {currentPage}
                        </Text>
                        { 
                            (currentPage < maxPage && 
                                <Button primary onClick={nextPage}>{">"}</Button>)
                            ||
                            <Button primary disabled>{">"}</Button>
                        }
                    </ButtonGroup>
                </Col>
                <Col></Col>
            </Row>
        </Container>
     );
}
 
export default DPUCList;