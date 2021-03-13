import React, { useState, useEffect } from "react";
import { AiOutlineClose as Close } from "react-icons/ai";
import CollapseCheckbox from "../../util/collapse/collapseCheckbox";
import PriceCollapse from "../../util/collapse/priceCollapse";
import ListCollapse from "../../util/collapse/listCollapse";

export default function Filter(props) {
  const [selectedModels, setSelectedModels] = useState(props.selectedModels);

  const [filters, setFilters] = useState({
    ...props.filters,
  });

  const handleFilters = async (newData, category, collection) => {
    const newFilters = { ...filters };
    if (category === "collection") {
      if (collection === "bestSeller") setSelectedModels(props.models["All"]);
      else setSelectedModels(props.models[collection]);

      newFilters[category] = newData;

      newFilters["model"] = [];
      setFilters(newFilters);
    } else {
      newFilters[category] = newData;

      setFilters(newFilters);
    }
  };

  return (
    <div className="filter-model__mobile">
      <Close
        className="close-icon"
        onClick={() => {
          props.closeModal();
        }}
        size="30px"
      />
      <div className="filters">
        <div className="title">Filter by</div>
        <div className="dash"></div>
        <ListCollapse
          handleFilters={(filters, collection) => {
            handleFilters(filters, "collection", collection);
          }}
          initState={true}
          list={props.collections}
          title="Collection"
          init={filters.collection}
        />
        <PriceCollapse
          handleFilters={(filters) => handleFilters(filters, "price")}
          initState={false}
          title="Price"
          sliderBlur={() => {}}
          init={filters.price}
        />

        <CollapseCheckbox
          initState={false}
          title="Model"
          collection={filters.collection}
          list={selectedModels}
          handleFilters={(filters) => handleFilters(filters, "model")}
          init={filters.model}
        />
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            setFilters({
              model: [],
              price: [0,500],
              collection: "All",
            });
            setSelectedModels(props.models["All"])
          }}
          className="btn__clear-filters"
        >
          Clear Filters
        </button>
        <button
          onClick={() => {
            props.applyFilters(filters);
            props.closeModal();
          }}
          className="btn__apply-filters"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
