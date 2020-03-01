import React, { Component,useState } from 'react';
import './FormBody.css';
import Recipe from './Recipe.js'
import Button from 'react-bootstrap/Button';



function FormBody()  {
   
  const [recipeList, setrecipeList] = useState([]);

  const fetchRecipes = () => {
    setrecipeList(recipeList.concat(<Recipe key={recipeList.length} />));
  }


  
    return (
      <div className="fb1">
        <br/>

        {/* Components to display Recipe name and a ratings widget */}
        <Recipe rid="1" />
        <Recipe rid="2" />
        <Recipe rid="3" />
        <div>
          <div className="additionalRecipes"> {recipeList} </div>
          <p>
            <p className="p1">Want to rate more recipes? Click Here-->
            <Button variant="outline-light" onClick={fetchRecipes}>Review More</Button>
            </p>
          </p>
        </div>
        
        <Button variant="outline-light">Submit</Button>
      </div>
    );
  
}

export default FormBody;