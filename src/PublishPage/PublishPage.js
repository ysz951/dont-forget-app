import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'

export default class PublishPage extends Component {
  static defaultProps = {
    
  }
  state = {
      stepContent: {"1": ""},
      arrContent: [],
      stepNum:1,
  }
  addStep = () => {
    //   let stepNum = 0
    //   Object.keys(this.state.stepContent).forEach(item => {
    //       if (Number(item) > stepNum) stepNum = Number(item)
    //   })

    //   console.log(stepNum)
      const newContent = {}
      newContent[`${this.state.stepNum + 1}`] = ""
      this.setState({
        stepContent: {
            ...this.state.stepContent,
            ...newContent,
        },
        stepNum: this.state.stepNum + 1
      })
  }
  textContent = (e) => {
    // console.log(e.target.key)
    const ind = e.target.id.split('-')[1]
    // console.log(ind)
    const newObj = {}
    newObj[`${ind}`] = e.target.value
    this.setState({
        stepContent: {
            ...this.state.stepContent,
            ...newObj,
        }
    })
  }
  deleteText = (e) => {
    const ind = e.target.id.split('-')[1]

    const newStepConent = this.state.stepContent
    delete newStepConent[`${ind}`]
    this.setState({
        stepContent: newStepConent
    })
  }
  show = () => {
    console.log(this.state.stepNum)
    const arr = Object.values(this.state.stepContent).filter(item => !!item)
    console.log(arr)
    const arrFinal = arr.map((item, i) => [i+1,item])
    // console.log(arrFinal)
  }
  render() {
      
    // const { recipe } = this.props
    // const {collectionList = new Set(), error} = this.context
    // console.log(recipe.img_src)
    return (
      <>
      <button onClick={this.show}> show</button>
        <form
        className='CommentForm'
        // onSubmit={this.handleSubmit}
        >
          
          {Object.entries(this.state.stepContent).map((item) => {
              let i = item[0]
              return (
                  <div key = {`textdiv-${i}`}>
                <textarea
                className={`step-${i}`}
                key={`step-${i}`}
                required
                aria-label='Type a step...'
                name={`step-${i}`}
                id={`step-${i}`}
                // cols='30'
                rows='3'
                placeholder='Type a step..'
                onKeyUp={e => {this.textContent(e)}}
              />
              <button type="button" id={`btn-${i}`} key ={`btn-${i}`} onClick={(e)=>this.deleteText(e)}> delete </button>
              </div>
              )
          })}
        {/* <textarea
          className='text'
          required
          aria-label='Type a comment...'
          name='text'
          id='text'
          // cols='30'
          rows='3'
          placeholder='Type a comment..'
        /> */}

        {/* <button type='submit'>
          Post comment
        </button> */}
        </form>
        <button onClick={this.addStep}> add </button>
      </>
    )
  }
}