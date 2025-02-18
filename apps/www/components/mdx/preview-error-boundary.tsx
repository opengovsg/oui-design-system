"use client"

import { Component, ReactNode } from "react"

interface PreviewErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface PreviewErrorBoundaryState {
  hasError: boolean
}

export class PreviewErrorBoundary extends Component<
  PreviewErrorBoundaryProps,
  PreviewErrorBoundaryState
> {
  constructor(props: PreviewErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static defaultProps = {
    fallback: (
      <div className="px-4 py-2 text-sm font-medium">
        Error rendering preview code
      </div>
    ),
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(): void {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
