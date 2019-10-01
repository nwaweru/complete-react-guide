import React, { useState } from 'react';

import './IngredientForm.css';
import Card from '../../UI/Card/Card';

const IngredientForm = React.memo(props => {
  const state = useState({
    title: '',
    amount: ''
  });

  const handleTitleInput = event => {
    const title = event.target.value;

    state[1](prevState => ({
      title,
      amount: prevState.amount
    }));
  };

  const handleAmountInput = event => {
    const amount = event.target.value;

    state[1](prevState => ({
      title: prevState.title,
      amount
    }));
  };

  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={state[0].title} onChange={event => handleTitleInput(event)} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={state[0].amount} onChange={event => handleAmountInput(event)} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
