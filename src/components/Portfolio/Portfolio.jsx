// component renders the pie charts based on the values in get in json format

// Library imports
import React from "react";
import { Fragment } from "react";

// Files imports
import { portfolioDetails } from "./Data";

// component imports
import PieChart from "./PieChart";

const Portfolio = () => {
  // Total value of the portfolio
  const totalValue = portfolioDetails
    .map((d) => d.amount)
    .reduce((sum, amount) => sum + amount, 0);

  const labels = portfolioDetails.map((p) => p.name);
  const data = portfolioDetails.map((p) => p.amount);

  return (
    <Fragment>
      <div className="flex items-center justify-between pt-4 px-8 text-light-base dark:text-dark-base">
        <h1 className="font-bold">Portfolio</h1>
        <p className="font-semibold text-sm">
          Total value :{" "}
          <span className="font-semibold text-light-muted dark:text-dark-muted">
            ${totalValue}
          </span>{" "}
        </p>
      </div>
      <PieChart labels={labels} data={data} />
    </Fragment>
  );
};

export default Portfolio;
