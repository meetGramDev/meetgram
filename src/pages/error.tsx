import { Component, ErrorInfo, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}
type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
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
        <div>
          <h2>Oops, there is an error!</h2>
          <button onClick={() => this.setState({ hasError: false })} type={'button'}>
            Try again?
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
