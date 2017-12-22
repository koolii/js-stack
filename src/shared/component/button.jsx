// @flow

import React from 'react'

// この段階で型を定義しておくことでButtonの時にFlowの型チェックとして利用できる
type Props = {
  label: string,
  handleClick: Function,
}

const Button = ({ label, handleClick }: Props) => (
  <button
    onClick={handleClick}
    className="btn btn-primary"
    type="button"
    // role="button"
  >
    {label}
  </button>
)

export default Button
