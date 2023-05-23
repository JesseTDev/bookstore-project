import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
// Imported Components
import LibraryFilters from "./components/Librayfilters.component";
import LoadingPage from "./components/Loading.page.component";
import Card from "../../shared/components/Card.component";
import SnackBar from "../../shared/components/Snackbar.component";
import { UserContext } from "../../shared/contexts/UserContext";

const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center; 
`; 

const BooksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const GENRE_ARRAY = [
  { name: "Fantasy", value: "Fantasy" },
  { name: "Romance", value: "Romance" },
  { name: "Health", value: "Health" },
];

const LibraryPage = () => {
  const {currentUser} = useContext(UserContext); 
  
  const [books, setBooks] = useState();
  const [selectedGenre, setSelectedGenre] = useState(currentUser?.favouriteGenre || 'Fantasy');
  const [selectedAuthor, setSelectedAuthor] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [openAuthSuccess, setOpenAuthSuccess] = useState(false);
  const [searchParams] = useSearchParams(); 


  const userFromSignIn = !!searchParams.get("fromAuth"); 
  

const getBooksByAuthor = async () => {
  try {
    setSelectedGenre(null); 
    const response =
      await axios.get(`https://www.googleapis.com/books/v1/volumes?q=author:${selectedAuthor}&key=${process.env.REACT_APP_GOOGLE_API_KEY}
`);
    setBooks(response.data.items);
  } catch (error) {
  }
};


  const getBooksByGenre = async () => {
    try {
      setLoading(true);
      setSelectedAuthor(null); 
      const response =
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${selectedGenre}&key=${process.env.REACT_APP_GOOGLE_API_KEY}
`);
      setBooks(response.data.items);
      setLoading(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenreSelectChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleAuthorChange = (e) => { 
    setSelectedAuthor(e.target.value); 
  };

  useEffect(() => {
    if(selectedGenre) {
      getBooksByGenre();
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre]);

  useEffect(() => {
    if(selectedAuthor) {
      getBooksByAuthor(); 
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAuthor]); 

  useEffect(() => {
    if(userFromSignIn) {
      setOpenAuthSuccess(true); 
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if(loading) {
  return ( 
    <LoadingPage loadingLabel={'Library'} />
  );
  } 
  return (
    <>

    <LibraryFilters handleAuthorChange={handleAuthorChange} GENRE_ARRAY={GENRE_ARRAY} handleGenreSelectChange={handleGenreSelectChange} selectedGenre={selectedGenre} /> 
  <Wrapper>
      {books ? (
        <BooksContainer>
          {books?.map((book) => {
            return <Card key={book.id} bookData={book} />;
          })}
        </BooksContainer>
      ) : (
       <LoadingPage />
      )}
      <SnackBar
      open={openAuthSuccess}
      setOpen={setOpenAuthSuccess}
      snackbarLabel="Succesfully logged In!"
      snackbarType="success"
       /> 
      </Wrapper>
    </>
  );
};

export default LibraryPage;

