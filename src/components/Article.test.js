import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const article = {
    id:"",
    headline:"test headline",
    author:"test author",
    summary:"",
    body:"",
    image:1,
    createdOn: Date.now()
    
}

const articleNoAuthor = {
    id:"",
    headline:"test headline",
    author:"",
    summary:"",
    body:"",
    image:1,
    createdOn: Date.now()
    
}

test('renders component without errors', ()=> {
    render(<Article key={article.id} article={article} handleDelete={null} handleEditSelect={null} />)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article key={article.id} article={article} handleDelete={null} handleEditSelect={null} />)

    const headline = screen.getByTestId(/headline/i);
    const author = screen.getByTestId(/author/i);
   
    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    

});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={articleNoAuthor}/>);
    const author = screen.queryByTestId(/author/i);
    
    expect(author).toBeInTheDocument(/Associated Press/i);
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    render(<Article article={articleNoAuthor} handleDelete={handleDelete}/>);
    
    const deleteButton = screen.queryByTestId('deleteButton');
    userEvent.click(deleteButton);
    
    expect(handleDelete.mock.calls).toHaveLength(1);
 
});

//Task List:
//1. Complete all above tests. Create test article data when needed.