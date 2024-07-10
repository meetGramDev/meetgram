import { Component, ErrorInfo, ReactNode } from 'react'

import { Button } from '@/shared/ui'

import s from './errorBoundary.module.scss'

type Props = {
  children?: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={s.root}>
          <h2 className={s.title}>Oops, there is an error!</h2>
          <Button onClick={() => this.setState({ hasError: false })}>Try again?</Button>
        </div>
      )
    }

    return this.props.children
  }
}
