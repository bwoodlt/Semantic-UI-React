import PropTypes from 'prop-types'
import { Children, Component } from 'react'
import { findDOMNode } from 'react-dom'

import { TYPES } from '../../lib/META'

/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */
export default class Ref extends Component {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.element.isRequired,

    /**
     * Called when componentDidMount.
     *
     * @param {HTMLElement} node - Referred node.
     */
    innerRef: PropTypes.func,
  }

  static _meta = {
    name: 'Ref',
    type: TYPES.ADDON,
  }

  componentDidMount() {
    // Heads up! Don't move this condition, it's a short circle that avoids run of `findDOMNode`
    // if `innerRef` isn't passed
    const { innerRef } = this.props
    if(!innerRef) return

    const node = findDOMNode(this)
    innerRef(node)
  }

  render() {
    const { children } = this.props

    return Children.only(children)
  }
}
