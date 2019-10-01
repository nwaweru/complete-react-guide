import React from 'react';

import Search from './Search/Search';
import IngredientForm from './IngredientForm/IngredientForm';

function Ingredients() {
  return (
    <div className="App">
      <IngredientForm />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
