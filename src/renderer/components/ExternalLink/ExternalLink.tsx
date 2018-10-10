import * as React from 'react';
import { shell } from 'electron';

interface OwnProps {
  to: string;
}

type Props = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  OwnProps;

export default class ExternalLink extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { to, children, ...rest } = this.props;

    return (
      <a href="#" onClick={this.handleClick} {...rest}>
        {children}
      </a>
    );
  }

  handleClick() {
    shell.openExternal(this.props.to);
  }
}
