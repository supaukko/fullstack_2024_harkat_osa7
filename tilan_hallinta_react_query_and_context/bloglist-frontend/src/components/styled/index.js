import styled from 'styled-components'

export const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

export const Container = styled.div`
  display: flex;
  margin: 10px 0;
  gap: 10px;
  font-size: 1.5rem;
`

export const Label = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`

export const Text = styled.span`
  color: #555;
`
export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const ListItem = styled.li`
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;

  &:hover {
    background-color: #f1f1f1;
  }
`
export const Button = styled.button`
  background-color: Bisque;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: coral;
  }
`
