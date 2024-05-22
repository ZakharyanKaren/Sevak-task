import React, { Component } from "react";
import { Folder, File } from "./FileFolderComponents";
import data from "./Data.json"; // Assuming your JSON data is stored in data.json

class MyBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      searchQuery: "",
      expandedFolders: props.expandedFolders || [],
    };
  }

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  filterData = (data, searchQuery) => {
    if (!searchQuery) return data;

    const filteredData = [];

    data.forEach((item) => {
      if (item.type === "FOLDER") {
        const filteredChildren = this.filterData(item.children, searchQuery);
        if (filteredChildren.length > 0) {
          filteredData.push({ ...item, children: filteredChildren });
        }
      } else if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        filteredData.push(item);
      }
    });

    return filteredData;
  };

  render() {
    const { searchQuery, data, expandedFolders } = this.state;
    const filteredData = this.filterData(data, searchQuery);

    return (
      <div>
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={this.handleSearch}
        />
        <div>
          {filteredData.map((item, index) => {
            if (item.type === "FOLDER") {
              return (
                <Folder
                  key={index}
                  {...item}
                  expanded={expandedFolders.includes(item.path)}
                />
              );
            }
            return <File key={index} {...item} />;
          })}
        </div>
      </div>
    );
  }
}

export default MyBrowser;
