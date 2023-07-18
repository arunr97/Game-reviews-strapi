import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query GET_CATEGORIES {
    categories {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }
`;

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  console.log("data1", data);

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {data.categories.data.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.Name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
