import React from "react";
import { Component } from "react";

export default class FormItem extends Component {
  propsCopy: any;

  constructor(props: any) {
    super(props);
    this.propsCopy = { ...this.props };
  }

  render() {
    const { children } = this.propsCopy;
    const renderChildNode = React.cloneElement(children);
    return renderChildNode;
  }
}
