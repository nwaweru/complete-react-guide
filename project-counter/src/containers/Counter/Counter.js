import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.increment} />
                <CounterControl label="Decrement" clicked={this.props.decrement}  />
                <CounterControl label="Add 5" clicked={() => this.props.add(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.subtract(5)}  />
                <hr />
                <button onClick={() => this.props.storeResults(this.props.counter)}>Store Result</button>
                <ul>
                    {this.props.results.map(result => (
                        <li key={result.id} onClick={() => this.props.deleteResult(result.id)}>{result.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counter: state.ctr.counter,
        results: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch({ type: actionTypes.INCREMENT }),
        decrement: () => dispatch({ type: actionTypes.DECREMENT }),
        add: value => dispatch({ type: actionTypes.ADD, value }),
        subtract: value => dispatch({ type: actionTypes.SUBTRACT, value }),
        storeResults: (result) => dispatch({ type: actionTypes.STORE_RESULT, result }),
        deleteResult: id => dispatch({ type: actionTypes.DELETE_RESULT, id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);