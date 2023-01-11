import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { sentenceContext } from "../../contexts/sentenceContext/sentenceContext";
import { useSentece } from "../../hooks/useSentence";
import { useUsers } from "../../hooks/useUsers";
import { iSentences } from "../../types/types";
import { RenderSentence } from "../render/renderHome";
import { RenderProfile } from "../render/renderProfile";
import { StyledInputSearchBox } from "../search/styledComponents";
import MiniCard from "./card/card";
import { StyledFilterSection } from "./styledComponents";

interface iFilterSection{
    page: "home" | "profile"
}


const FilterSection = ({page}:iFilterSection) => {
    const { sentences, renderFilterAndSearchSentences, filtradedSentences, getSentences } = useSentece()
    const { user } = useUsers()
    const [profileSentences, setProfileSentences] = useState<iSentences[]>([])
    const [categories, setCategories] = useState<string>("Todas")
    const [searchValue, setSearchValue] = useState("")
    
    useEffect(() =>{
        if(page === "profile"){

            const sentencesCreated =  sentences.filter((sentence)=> sentence.userId === user?.id)
            setProfileSentences([...sentencesCreated])
        }
    },[sentences])

    const buttonFilter = (buttonName:string) => {
        setCategories(buttonName);
        
        getSentences();
    };
    return(
    <>
        <StyledInputSearchBox>
            <input type="text" placeholder="Digitar Pesquisa" onChange={(e)=>{
                setSearchValue(e.target.value)
                getSentences()
                }}/>
            <button><AiOutlineSearch/></button>
        </StyledInputSearchBox>
        <StyledFilterSection>
            {page === "home"? (
                <div>
                <div>
                    <button type="button" id="buttonLi" onClick={(e)=>{buttonFilter(e.currentTarget.innerHTML)}}>Todas</button>
                    <button type="button" id="buttonLi" onClick={(e)=>{buttonFilter(e.currentTarget.innerHTML)}}>Formal</button>
                    <button type="button" id="buttonLi" onClick={(e)=>{buttonFilter(e.currentTarget.innerHTML)}}>Engraçada</button>
                    <button type="button" id="buttonLi" onClick={(e)=>{buttonFilter(e.currentTarget.innerHTML)}}>Paquera</button>
                    <button type="button" id="buttonLi" onClick={(e)=>{buttonFilter(e.currentTarget.innerHTML)}}>Criativas</button>
                    <button type="button" id="buttonLi" onClick={(e)=>{buttonFilter(e.currentTarget.innerHTML)}}>Pessoal</button>
                    <button type="button" id="buttonLi" onClick={(e)=>{buttonFilter(e.currentTarget.innerHTML)}}>Curiosidade</button>
                    <button type="button" id="buttonLi" onClick={(e)=>{buttonFilter(e.currentTarget.innerHTML)}}>Intimidade</button>
                </div>
                <RenderProfile filterButton={categories} searchValue={searchValue}/>
                {/* {filtradedSentences.length > 0? (
                    <ul>
                        {filtradedSentences.map((sentence:iSentences)=>
                            <MiniCard type="favorite" sentence={sentence} key={sentence.id}/>
                        )}
                    </ul>
                ):(
                    <div>
                        <h2>Ainda não existem frases cadastradas nesta categoria</h2>
                    </div>
                )} */}
                
            </div>
            ):(
                <StyledFilterSection>
                    <div>
                        <div>
                            <button type="button" id="buttonLi" onClick={(e)=>buttonFilter(e.currentTarget.innerHTML)}>Todas</button>
                            <button type="button" id="buttonLi" onClick={(e)=>buttonFilter(e.currentTarget.innerHTML)}>Favoritas</button>
                            <button type="button" id="buttonLi" onClick={(e)=>buttonFilter(e.currentTarget.innerHTML)}>Criadas</button>
                        </div>
                        <RenderProfile filterButton={categories} searchValue={searchValue}/>

                    </div>
                </StyledFilterSection> 
            )}
            
        </StyledFilterSection>
    </>
    )
    
}
export default FilterSection;