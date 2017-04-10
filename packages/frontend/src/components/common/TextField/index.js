import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import classes from './TextField.scss'

const ENTER_KEY_CODE = 13

export default class TextField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onEnterKey: PropTypes.func,
    label: PropTypes.string.isRequired,
    text: PropTypes.string,
    rows: PropTypes.number,
    hideText: PropTypes.bool
  }

  componentDidMount () {
    let jsElem = ReactDOM.findDOMNode(this.refs.textfield)
    componentHandler.upgradeElement(jsElem)
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value)
  }

  handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE && this.props.onEnterKey) {
      this.props.onEnterKey(e.target.value)
      e.preventDefault()
    }
  }

  render () {
    let textfieldType = 'text'
    if (this.props.hideText) {
      textfieldType = 'password'
    }

    let textfield
    if (!this.props.rows || this.props.rows === 1) {
      textfield = (<input className='mdl-textfield__input' type={textfieldType} id='textfield'
        value={this.props.text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />)
    } else {
      textfield = (<textarea className='mdl-textfield__input' type='text' rows={this.props.rows} id='textfield'
        value={this.props.text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />)
    }

    return (
      <div className={classnames('mdl-textfield', 'mdl-js-textfield',
        classes.textfield)} ref='textfield'>
        <label className={classes.label} htmlFor='textfield'>{this.props.label}</label>
        {textfield}
      </div>
    )
  }
}