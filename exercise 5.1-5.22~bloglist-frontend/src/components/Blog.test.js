import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog Test', () => {
  const user = {
    username: 'username',
    id: '124125'
  }

  const blog = {
    likes: 0,
    author: 'Dummy Author',
    title: 'Dummy Title',
    url: 'Dummy URL',
    user: { ...user }
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blogData={blog} userData={user} />
    )
  })

  test('Blog is rendered and only title and author are shown initially', () => {
    expect(component.container).toHaveTextContent('Dummy Title Dummy Author')
    expect(component.container).not.toHaveTextContent('Dummy URL')
    expect(component.container).not.toHaveTextContent('0')
  })

  test('Url and likes are shown after the view button is clicked', () => {
    const button = component.container.querySelector('.displayer')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Dummy URL')
  })

})