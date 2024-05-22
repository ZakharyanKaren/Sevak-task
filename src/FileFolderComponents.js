import React, { Component } from "react";

// File Component
class File extends Component {
  render() {
    const { name, mime } = this.props;
    return (
      <div>
        {name} ({mime})
      </div>
    );
  }
}

// Folder Component
class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: !props.expanded,
    };
  }

  toggleCollapse = () => {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    const { name, children } = this.props;
    const { collapsed } = this.state;

    return (
      <div>
        <div onClick={this.toggleCollapse}>
          {collapsed ? "+" : "-"} {name}
        </div>
        {!collapsed && (
          <div style={{ paddingLeft: 20 }}>
            {children.map((child, index) => {
              if (child.type === "FOLDER") {
                return <Folder key={index} {...child} />;
              }
              return <File key={index} {...child} />;
            })}
          </div>
        )}
      </div>
    );
  }
}

export { File, Folder };
