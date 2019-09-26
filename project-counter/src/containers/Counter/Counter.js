import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import CounterControl from '../../components/CounterControl/CounterControl';

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
                <button onClick={() => this.props.storeResult(this.props.counter)}>Store Result</button>
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
        increment: () => dispatch(actionCreators.increment()),
        decrement: () => dispatch(actionCreators.decrement()),
        add: value => dispatch(actionCreators.add(value)),
        subtract: value => dispatch(actionCreators.subtract(value)),
        storeResult: result => dispatch(actionCreators.storeResult(result)),
        deleteResult: id => dispatch(actionCreators.deleteResult(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
